import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AlertController} from "ionic-angular";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {FileChooser} from '@ionic-native/file-chooser';
import {FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {Platform} from 'ionic-angular';

/*
  Generated class for the FiletransferProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FiletransferProvider {

  private uploadFilePath: string;
  private uploadFileName: string;

  constructor(public http: Http, private fileOpener: FileOpener, private file: File, private fileChooser: FileChooser,
              public alertCtrl: AlertController, private fileTransfer: FileTransferObject, private filePath: FilePath,
              private camera: Camera, public plt: Platform) {

  }

  private createAuthorizationHeaderUpload(headers: Headers) {
    headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'multipart/form-data');
  }

  openDocument(url: string): Promise<any> {

    if (this.plt.is('ios')) {
      let options = {
        maximumImagesCount: 8,
        width: 200,
        height: 200,
        quality: 100,
        //destinationType:0,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG | this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.ALLMEDIA,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
      }

      return this.camera.getPicture(options).then((results) => {
        this.uploadFilePath = results;
        return this.checkFileSize()
      }).then((isLimit) => {
        if (isLimit) {
          return this.uploadDocument(url)
            .catch(error => {
              console.log("upload doc 1 error " + error);
              throw error;
            });
        }
      }).catch(error => {
        console.log("File Upload error " + error)
        throw error;
      });
    } else {
      return this.fileChooser.open()
        .then(uri => {
          return this.filePath.resolveNativePath(uri)
        })
        .then(fullFilePath => {
          this.uploadFilePath = fullFilePath;
          return this.checkFileSize()
        }).then((isLimit) => {
          if (isLimit) {
            return this.uploadDocument(url)
              .catch(error => {
                console.log("upload doc 1 error " + error);
                throw error;
              });
          }
        }).catch(error => {
          console.log("File Upload error " + error)
          throw error;
        });
      ;
    }
  }

  private checkFileSize(): Promise<boolean> {
    let fileSize = 0;
    return this.file.resolveLocalFilesystemUrl(this.uploadFilePath)
      .then((files) => {
        let referenceThis = this;
        return new Promise((resolve, reject) => {
          files.getMetadata(function (metadata) {
            fileSize = metadata.size; // Get file size
            if (fileSize > 2097152) {
              let size = fileSize / 1048576;
              let errMsg = 'File is too big (' + size.toPrecision(3) + 'MB). Max filesize: 2MB.';
              let alert = referenceThis.alertCtrl.create({
                title: 'Alert',
                message: errMsg,
                buttons: ['Ok']
              });
              alert.present();
              resolve(false);
            } else {
              resolve(true);
            }
          })
        })
      }).catch(error => {
        console.log(error);
        throw error;
      })
  }


  uploadDocument(url: string): Promise<any> {
    let headers = new Headers();
    this.createAuthorizationHeaderUpload(headers);
    let decodedFilePath = this.uploadFilePath;
    this.uploadFileName = decodedFilePath.substr(decodedFilePath.lastIndexOf('/') + 1);
    let fileFormat: string = decodedFilePath.substr(decodedFilePath.lastIndexOf('.') + 1);
    let mimeFormat: string = this.getMimeType(fileFormat);
    //let fileSize = 0;
    let options: FileUploadOptions = {
      fileName: this.uploadFileName,
      mimeType: mimeFormat,
      httpMethod: "POST",
      headers: headers,
    };
    return this.fileTransfer.upload(this.uploadFilePath, encodeURI(url), options)
      .then(data => {
        return this.extractData(data.response);
      }).catch(error => {
        throw error;
      });
  }

  private createAuthorizationHeaderOpen(headers: Headers) {
    headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/octet-stream');
  }

  //---Open the attachments in view mode
  openAttachment(attachment: any) {

    let openHeaders = new Headers();
    this.createAuthorizationHeaderOpen(openHeaders);
    let options = {openHeaders};

    let fileurl = ServiceConfig.DOWNLOAD_FILE + '/' + attachment.fileUploadId + '/' + attachment.fileName;
    let downloadurl = encodeURI(fileurl);
    var filename = attachment.fileName;
    let fileFormat: string = filename.substr(filename.lastIndexOf('.') + 1);
    let mimeFormat: string = this.getMimeType(fileFormat);
    this.fileTransfer.download(downloadurl, this.file.dataDirectory + '/' + attachment.fileName, true, options)
      .then((entry) => {
        this.fileOpener.open(decodeURI(entry.toURL()), mimeFormat).then(() => console.log('File is opened'))
          .catch(err => {
            console.log('Error in download: ' + err.message);
            const alert = this.alertCtrl.create({
              title: 'Alert',
              message: 'File format not supported',
              buttons: ['Ok']
            });
            alert.present();
          });
      }, (error) => {
        console.log('Error in download: ' + error.message);
        const alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Unable to download the file from server',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  //For viewing a Document
  // Generalized method :- could be reused in several modules
  viewDocument(fileurl: string, file_type: string, file_name: string) {

    let openHeaders = new Headers();
    this.createAuthorizationHeaderOpen(openHeaders);
    let options = {openHeaders};

    let downloadurl = encodeURI(fileurl);
    downloadurl = downloadurl.replace("+", "%2B");
    let mimeFormat: string = this.getMimeType(file_type);

    this.fileTransfer.download(downloadurl, this.file.dataDirectory + '/' + file_name, true, options)
      .then((entry) => {
        this.fileOpener.open(decodeURI(entry.toURL()), mimeFormat).then(() =>
          console.log(entry.toURL()))
          .catch(err => {
            console.log('Error in download: ' + err.message);
            const alert = this.alertCtrl.create({
              title: 'Alert',
              message: 'File format not supported',
              buttons: ['Ok']
            });
            alert.present();
          });
      }, (error) => {
        console.log('Error in download: ' + error.message);
        const alert = this.alertCtrl.create({
          title: 'Alert',
          message: 'Unable to download the file from server',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  private extractData(res: any) {
    let body = JSON.parse(res);
    return body != null ? body : {};
  }

  private getMimeType(fileFormat: string) {
    let mimeFormat: string = 'application/' + fileFormat;
    if (fileFormat.toLowerCase() == "jpg" || fileFormat.toLowerCase() == "jfif" || fileFormat.toLowerCase() == "jpe"
      || fileFormat.toLowerCase() == "jpeg") {
      mimeFormat = "image/jpeg";
    }
    else if (fileFormat.toLowerCase() == "png" || fileFormat.toLowerCase() == "x-png") {
      mimeFormat = "image/png";
    }
    else if (fileFormat.toLowerCase() == "txt") {
      mimeFormat = "text/plain";
    }
    else if (fileFormat.toLowerCase() == "doc" || fileFormat.toLowerCase() == "dot" || fileFormat.toLowerCase() == "w6w"
      || fileFormat.toLowerCase() == "wiz" || fileFormat.toLowerCase() == "word") {
      mimeFormat = "application/msword";
    }
    else if (fileFormat.toLowerCase() == "xl" || fileFormat.toLowerCase() == "xla" || fileFormat.toLowerCase() == "xlb"
      || fileFormat.toLowerCase() == "xlc" || fileFormat.toLowerCase() == "xld" || fileFormat.toLowerCase() == "xlk"
      || fileFormat.toLowerCase() == "xll" || fileFormat.toLowerCase() == "xlm" || fileFormat.toLowerCase() == "xls"
      || fileFormat.toLowerCase() == "xlt" || fileFormat.toLowerCase() == "xlv" || fileFormat.toLowerCase() == "xlw") {
      mimeFormat = "application/excel";
    }
    else if (fileFormat.toLowerCase() == 'docx') {
      mimeFormat = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    else if (fileFormat.toLowerCase() == 'xlsx') {
      mimeFormat = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    else if (fileFormat.toLowerCase() == "ppt" || fileFormat.toLowerCase() == "pot" || fileFormat.toLowerCase() == "pps") {
      mimeFormat = "application/vnd.ms-powerpoint";
    }
    else if (fileFormat.toLowerCase() == "xls" || fileFormat.toLowerCase() == "pot" || fileFormat.toLowerCase() == "pps") {
      mimeFormat = "application/vnd.ms-excel";
    } else if (fileFormat.toLowerCase() == "xml") {
      mimeFormat = "text/xml";
    }
    else if (fileFormat.toLowerCase() == "pdf") {
      mimeFormat = "application/pdf";
    }
    else if (fileFormat.toLowerCase() == "csv") {
      mimeFormat = "text/csv";
    }
    return mimeFormat;
  }

}
