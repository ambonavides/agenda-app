import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-usuario',
    template: '',
})
export class SuperComponent implements OnInit {

    closeResult: string;
    isEdicao: boolean;
    modalReference: NgbModalRef;

    constructor(
        protected modalService: NgbModal,
        protected router: Router
    ) {
        this.isEdicao = false;
    }

    ngOnInit(): void {
       
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } 
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public navigate(url: string){
        this.router.navigate([`/${url}`]);
    }

    public navigateParams(url: string, id: number, edicao: boolean){
        this.router.navigate([`/${url}`], {queryParams: {id, edicao}});
    }

    public close(){
        this.modalService.dismissAll();
    }


    
}
