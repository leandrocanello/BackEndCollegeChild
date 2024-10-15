CREATE TABLE aluno(
    idaluno serial primary key not null,
    nome varchar(30) not null,
    sobrenome varchar(30),
    periodo int not null,
    observacao varchar(100),
    idturma integer,
    idresponsavel integer,
    constraint fk_turma foreign key (idturma) references turma(idturma),
    constraint fk_responsavel foreign key (idresponsavel) references responsavel(idresponsavel)
);

CREATE TABLE professor(
    idprofessor serial primary key,
    nome varchar(30)
);

CREATE TABLE materia(
    idmateria serial primary key,
    nomemateria varchar(30),
    idaluno integer not null,
    constraint fk_aluno foreign key(idaluno) references aluno(idaluno)
);

CREATE TABLE responsavel(
    idresponsavel serial primary key,
    nome varchar(30) not null,
    celular varchar(30) not null
);

CREATE TABLE turma(
    idturma serial primary key,
    numeroturma integer,
    idprofessor integer not null,
    constraint fk_professor foreign key(idprofessor) references professor(idprofessor)
);

CREATE TABLE frequencia(
    idfrequencia serial primary key,
    diaaula date not null,
    presenca boolean not null,
    idaluno integer not null,
    constraint fk_aluno foreign key(idaluno) references aluno(idaluno)
);

CREATE TABLE alunomateria(
    idalunomateria serial primary key,
    idaluno integer not null,
    idmateria integer not null,
    constraint fk_aluno foreign key(idaluno) references aluno(idaluno),
    constraint fk_materia foreign key(idmateria) references materia(idmateria)
);

CREATE TABLE nota(
    idnota serial primary key,  
    semestre integer,
    tipodeavaliacao varchar(30),
    nota numeric(3, 2),
    idaluno integer, 
    idmateria integer, 
    constraint fk_aluno foreign key(idaluno) references aluno(idaluno),
    constraint fk_materia foreign key(idmateria) references materia(idmateria)
);

CREATE TABLE userr(
    iduser serial primary key,
    username text not null unique,
    role varchar(20) not null,
    salt text not null,
    password text not null
);

CREATE TABLE aluno_gamificacao (
    idaluno integer PRIMARY KEY,
    nivel integer DEFAULT 1,
    xp integer DEFAULT 0,
    CONSTRAINT fk_aluno FOREIGN KEY (idaluno) REFERENCES aluno(idaluno)
);
