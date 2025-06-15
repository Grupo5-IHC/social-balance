import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
    integrantes = [
    {
      nombre: 'César Aróstegui',
      descripcion: 'Estudiante de Ingeniería de Software',
      imagen: 'members/cesar.png',
    },
    {
      nombre: 'Rodrigo Solano',
      descripcion: 'Estudiante de Ingeniería de Sistemas',
      imagen: 'members/rodrigo.png',
    },
    {
      nombre: 'Ángel Crispín',
      descripcion: 'Estudiante de Ingeniería de Software',
      imagen: 'members/angel.png',
    },
    {
      nombre: 'Alexander Montoya',
      descripcion: 'Estudiante de Ingeniería de Software',
      imagen: 'members/montoya.png',
    },
    {
      nombre: 'Giordano Trejo',
      descripcion: 'Estudiante de Ingeniería de Software',
      imagen: 'members/giordano.png',
    },
    {
      nombre: 'Josep Melgarejo',
      descripcion: 'Estudiante de Ingeniería de Software',
      imagen: 'members/melgarejo.png',
    },
  ];
}
