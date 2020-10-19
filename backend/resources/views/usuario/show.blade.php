@extends('layout')

@section('mainContent')
	<h1 align="center">Mostrar Usuario</h1>
	<p></p>
	<div align="center">
		<H1> {{$usuario->sobrenome}}, {{$usuario->nome}} </H1>
		<p>
			<strong> {{$usuario->id_usuario}} </strong>
			<strong> {{$usuario->email}} </strong>
			<strong> {{$usuario->senha}} </strong>
		</p>
		<button><a href="{{$usuario->id_usuario}}/edit">Editar</a></button>
	</div>
@endsection