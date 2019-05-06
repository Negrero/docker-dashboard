import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ConfigService } from './api/config.service';
import { ContainerService } from './api/container.service';
import { DistributionService } from './api/distribution.service';
import { ExecService } from './api/exec.service';
import { ImageService } from './api/image.service';
import { NetworkService } from './api/network.service';
import { NodeService } from './api/node.service';
import { PluginService } from './api/plugin.service';
import { SecretService } from './api/secret.service';
import { ServiceService } from './api/service.service';
import { SessionExperimentalService } from './api/sessionExperimental.service';
import { SwarmService } from './api/swarm.service';
import { SystemService } from './api/system.service';
import { TaskService } from './api/task.service';
import { VolumeService } from './api/volume.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ConfigService,
    ContainerService,
    DistributionService,
    ExecService,
    ImageService,
    NetworkService,
    NodeService,
    PluginService,
    SecretService,
    ServiceService,
    SessionExperimentalService,
    SwarmService,
    SystemService,
    TaskService,
    VolumeService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
