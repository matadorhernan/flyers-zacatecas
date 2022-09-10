import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from './core/services';
import { APP_CONFIG } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('webviewItem', { static: false })
  public webviewItem: ElementRef;

  public readonly url = 'https://zacatecas.flyersescueladeaviacion.com';
  public isLoading: boolean;
  public isReady: boolean;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.isLoading = true;
    this.isReady = false;
    this.translate.setDefaultLang('en');
    console.log('AppConfig', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    this.handleLoad();
  }

  handleLoad() {
    this.isReady = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3500);
  }
}
