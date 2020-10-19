@extends('layout')

@section('mainContent')
	<h1 align="center">Editar Usuario</h1>
	<div align="center">
		<form method="post" action="/usuario/{{$usuario->id_usuario}}">

			@csrf
			@method('put')

			<table align="center">
				<tr>
					<td>Nome: </td>
					<td><input required="required" type="text" name="nome" id="nome" value="{{$usuario->nome}}" placeholder="Novo Nome"></td>
				</tr>

				<tr>
					<td>Nome: </td>
					<td><input required="required" type="text" name="sobrenome" id="sobrenome" value="{{$usuario->sobrenome}}" placeholder="Novo Sobrenome"></td>
				</tr>

				<tr>
					<td>Email: </td>
					<td><input required="required" type="text" name="email" id="email" value="{{$usuario->email}}" placeholder="Novo Email" ></td>
				</tr>

				<tr>
					<td>Senha: </td>
					<td><input required="required" type="text" name="senha" id="senha" value="{{$usuario->senha}}" placeholder="Nova Senha"></td>
				</tr>
			</table>

			<div>
				<input type="submit" name="Atualizar" value="Atualizar">
			</div>
		</form>

		<form method="post" action="/usuario/{{$usuario->id_usuario}}">
			@csrf
			@method('delete')
			<div>
				<input type="submit" name="Deletar" value="Deletar">
			</div>
		</form>

		@if($errors->any())
			<div align="center">
				<ul>
					@foreach($errors->all() as $error)
						<li> {{$error}} </li>
					@endforeach
				</ul>
			</div>
		@endif
	</div>
@endsection