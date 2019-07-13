import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICharacteristics } from 'app/shared/model/characteristics.model';
import { CharacteristicsService } from './characteristics.service';

@Component({
  selector: 'jhi-characteristics-delete-dialog',
  templateUrl: './characteristics-delete-dialog.component.html'
})
export class CharacteristicsDeleteDialogComponent {
  characteristics: ICharacteristics;

  constructor(
    protected characteristicsService: CharacteristicsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.characteristicsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'characteristicsListModification',
        content: 'Deleted an characteristics'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-characteristics-delete-popup',
  template: ''
})
export class CharacteristicsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ characteristics }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CharacteristicsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.characteristics = characteristics;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/characteristics', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/characteristics', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
