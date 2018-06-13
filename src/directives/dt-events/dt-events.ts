import {Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input,HostListener} from '@angular/core';
import { Gesture } from "ionic-angular/gestures/gesture";
import { Slides } from 'ionic-angular';


/**
 * Generated class for the DtEventsDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[dt-events]' // Attribute selector
})
export class DtEventsDirective implements OnInit,OnDestroy{

  elem : HTMLElement;
  actions : Gesture;
  multiSelectEnable : boolean = false;
  multiSelectCount : number = 0;
  lastSelected : any;


  @Output('onDtLongPress') longPress = new EventEmitter<any>();
  @Output('onDtCustomClick') customClick = new EventEmitter<any>();
  @Input('onDtItreation') iteration  : any;


  constructor(el:ElementRef) {
    this.elem = el.nativeElement;
    localStorage.setItem('multiSelectEnable','false');
    localStorage.setItem('multiSelectCount','0');
    localStorage.setItem('LastSelected','');
  }

  ngOnInit(){
    this.actions =  new Gesture(this.elem);
    this.actions.listen();
    this.actions.on('press',e =>{
      if(localStorage.getItem('multiSelectEnable') != 'true'){
        this.handleLongPress(this.iteration);
        localStorage.setItem('multiSelectEnable','true');
        localStorage.setItem('multiSelectCount','1');
        this.iteration.lastSelectedTime = Date.now()/1000;
        localStorage.setItem('LastSelected',JSON.stringify(this.iteration));
      }
    })
    this.elem.addEventListener('click',e=>{
      let isContinue = true;
      if(this.iteration.lastSelectedTime != undefined){
        if((JSON.stringify(this.iteration) === localStorage.getItem('LastSelected')) == true){
          let currentTime = Date.now()/1000;
          if((currentTime - this.iteration.lastSelectedTime) < 2){
            isContinue = false;
          }
        }
      }
      if(isContinue == true){
        if(this.iteration.selected == undefined || this.iteration.selected != true){
          if(localStorage.getItem('multiSelectEnable') == 'true'){
            this.handleLongPress(this.iteration);
            let multiSelectIncrement = parseInt(localStorage.getItem('multiSelectCount')) + 1;
            localStorage.setItem('multiSelectCount',multiSelectIncrement.toString());
          }
          else{
            this.customClick.emit(this.iteration);
          }
        }
        else{
          this.onDeselect(this.iteration);
          if(parseInt(localStorage.getItem('multiSelectCount')) > 0){
            let multiSelectDecrement = parseInt(localStorage.getItem('multiSelectCount')) - 1;
            localStorage.setItem('multiSelectCount',multiSelectDecrement.toString());
            if(parseInt(localStorage.getItem('multiSelectCount')) == 0){
              localStorage.setItem('multiSelectEnable','false');
            }
          }
        }
        this.iteration.lastSelectedTime = Date.now()/1000;
        localStorage.setItem('LastSelected',JSON.stringify(this.iteration));
      }

    })
  }
  ngOnDestroy(){
    localStorage.setItem('multiSelectEnable','false');
    localStorage.setItem('multiSelectCount','0');
    this.actions.destroy();
  }

  handleLongPress(selectedItr){
    if(selectedItr.selected != true){
      this.elem.classList.add('dt-event-selected');
      this.iteration.selected = true;
      let dom = this.elem.querySelector('.statusCenter');
      dom.insertAdjacentHTML('afterbegin',"<img class='myttClass dt-elem-selected' style='display: none;' *ngIf='selectedItr.selected == true' src='assets/img/approved.svg' />");
      let listnerDom = this.elem.querySelector('.dt-elem-selected');
      listnerDom.addEventListener('click',e => {
        this.onDeselect(selectedItr);
      })
      this.longPress.emit({select:true,value:selectedItr});
    }
  }

  onDeselect(selectedItr){
    this.elem.classList.remove('dt-event-selected');
    this.elem.querySelector('.dt-elem-selected').remove();
    selectedItr.selected = false;
    this.longPress.emit({select:false,value:selectedItr});
  }

}
