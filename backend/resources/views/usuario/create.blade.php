@extends('layout')

@section('mainContent')

	<h1 align="center">Criar Usuario</h1>
	<div align="center">
		<form method="post" action="/usuario">

			@csrf

			<table align="center">
				<tr>
					<td>Nome: </td>
					<td><input required="required" type="text" name="nome" id="nome" placeholder="Insira seu Nome"></td>
				</tr>

				<tr>
					<td>Sobrenome: </td>
					<td><input required="required" type="text" name="sobrenome" id="sobrenome" placeholder="Insira seu Sobrenome"></td>
				</tr>

				<tr>
					<td>Email: </td>
					<td><input required="required" type="text" name="email" id="email" placeholder="Insira seu Email" ></td>
				</tr>

				<tr>
					<td>Senha: </td>
					<td><input required="required" type="password" name="senha" id="senha" placeholder="Insira sua Senha"></td>
				</tr>
			</table>

			<div>
				<button id="salvar" name="salvar">Salvar</button>
			</div>
		</form>
		<div>
			<a href="/usuario">Mostrar Usuarios</a>
		</div>

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