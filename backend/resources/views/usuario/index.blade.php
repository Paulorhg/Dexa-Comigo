@extends('layout')

@section('mainContent')
	<h1 align="center">Usuarios</h1>

	<table class="table table-striped" align="center">
		<thead>
			<tr>
				<th>Id</th>
				<th>Sobrenome, Nome</th>
				<th>E-mail</th>
				<th>Senha</th>
			</tr>
		</thead>
		<tbody>
			@foreach($usuario as $usuarios)
				<tr>
					<td><a href="usuario/{{$usuarios->id_usuario}}"> {{$usuarios->id_usuario}}</a></td>
					<td> {{$usuarios->sobrenome}}, {{$usuarios->nome}} </td>
					<td> {{$usuarios->email}} </td>
					<td> {{$usuarios->senha}} </td>
				</tr>
			@endforeach
		</tbody>
	</table>

	<h1 align="center"><a href="/usuario/create">Cadastrar Usuario</a></h1>
@endsection