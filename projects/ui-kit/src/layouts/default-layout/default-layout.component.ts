import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../../components';
import { HeaderComponent } from '../header/header.component';
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
  standalone: true,
  selector: 'app-default-layout',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent, ToastComponent],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

}