import { Component, OnInit, EventEmitter } from "@angular/core";
import { ContainerService, NetworkService, VolumeService, Volume, VolumeListResponse } from "./models-docker";

import { Network, DataSet, Node, Edge } from "../../node_modules/vis";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { Network as Network_vis } from "vis";
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "dashboard-docker";
  public showContainer = true;
  public showNetwork = false;
  public showVolume = false;
  public opened;
  public nodes = new DataSet();
  public edges = new DataSet();
  public vis_network: Network;
  public networkService: NetworkService;
  public containerApi: ContainerService;
  public volumeService: VolumeService;
  public containers: Array<any>;
  public networks: Array<any>;
  public volumes: Array<Volume>;
  public open: EventEmitter<any> = new EventEmitter();
  constructor(containerService: ContainerService, networkSevice: NetworkService, volumeSevice: VolumeService ) {
    this.containerApi = containerService;
    this.networkService = networkSevice;
    this.volumeService = volumeSevice;
    this.showContainer = true;

  }
  public ngOnInit(): void {
    const container = document.getElementById('mynetwork');
    const options = {
      "edges": {
        "smooth": {
          "type": "continuous",
          "roundness": 0.2
        }
      },
      "physics": {
        "repulsion": {
          "centralGravity": 0,
          "springLength": 95,
          "nodeDistance": 20,
          "damping": 0.54
        },
        "minVelocity": 0.75,
        "solver": "repulsion",
        "timestep": 0.73
      }
    }
    this.vis_network = new Network_vis(container, {nodes: this.nodes, edges: this.edges}, {
      groups: {
        container: {
          background: 'red'
        }
      },
      layout: {
      hierarchical: {
        sortMethod: 'directed',
        direction: 'LR' // left-rigth
      }
      }});
    this.setupContainer();
    const that: {[index: string]: any} = this;
    this.vis_network.on('click', (param: any) => {
       const emitter = that["open"] as EventEmitter<any>;
       emitter.emit(param)
    });
    this.open.subscribe((param) => {
      this.opened = true;
      console.log(param);
    })
  }
private clickNetwork(param, param1){
  this.opened = true
}
  private setupContainer(){

    this.containerApi.containerList().subscribe(
      response => {
        let obj: any;
        let nodes = [];
        this.containers = response;
        for (let i = 0; i < response.length - 1; i++){
          obj = response[i];
          let color = (obj.State === 'running') ? 'green' :
                      (obj.State === 'stopped') ? 'red' : 'blue';

          nodes.push({
            id: obj.Id,
            label: obj.Names[0],
            shape: 'square',
            group: 'container',
            color: color

          });
        }
        this.nodes.add(nodes);
        this.setupNetwork();

      },
      () => {
        console.log();
      },
      () => {
        console.log();
      }
    );
  }
  private setupNetwork(){
    this.networkService.networkList().subscribe(
      response => {
        let obj: any;
        let nodes = []
        this.networks = response;
        for (let i = 0; i < response.length - 1; i++){
          obj = response[i];
          nodes.push({
            id: obj.Id,
            label: obj.Name,
            shape: 'triangle',
            group: 'network'
          });
        }
        this.nodes.add(nodes);
        this.setupVolume();
      },
      () => {
        console.log();
      },
      () => {
        console.log();
      }
    );
  }
  private setupVolume() {
    this.volumeService.volumeList().

    subscribe(
      (response) => {
        let obj: any;
        let nodes = [];
        let v : VolumeListResponse = {
          volumes: response['Volumes'],
          warnings: response['Warnings']
        };
        this.volumes = v.volumes;

        for (let i = 0; i < v.volumes.length - 1; i++){
          obj = v.volumes[i];
          nodes.push({
            id: obj.Name,
            label: obj.Name,
            shape: 'dataBase',
            group: 'volume'
          });
        }
        this.nodes.add(nodes);
        this.createEdges();

      },
      () => {
        console.log();
      },
      () => {
        console.log();
      }
    );

  }
  private createEdges(){
    let networks = this.networks;
    let edges = this.edges;
    let volumes = this.volumes
    this.containers.forEach(function(c) {
      networks.forEach(function(e) {
          if (c.NetworkSettings.Networks[e.Name] !== undefined){
            edges.add({
              from: c.Id,
              to: e.Id,
              label: c.NetworkSettings.Networks[e.Name].IPAddress
              // font: {align: 'top'}
            });
          }
      });
    });
    this.containers.forEach(function(c) {
      c.Mounts.forEach(function(m) {
        if (m.Name !== undefined) {
        volumes.forEach(function(v) {
          if (m.Name === v.name) {
          edges.add({
            from: m.Name,
            to: c.Id,
            label: m.Name
            // font: {align: 'top'}
          });
          }
        });
        }


      });
    });

  }
}
