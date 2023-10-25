import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html'
})
export class DocumentosComponent {
  @Input() nombreInputNombre: string = "";
  @Input() nombreInputDocumento: string = "";
  @Input() modeloNombre: string = "";
  @Input() modeloDocumento: File | null = null;

}
