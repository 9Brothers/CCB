# Sistema de Contagem de Recitativos - CCB

## Visão Geral

O **Sistema de Contagem de Recitativos** é uma aplicação web desenvolvida para a **Congregação Cristã no Brasil (CCB)** que permite registrar e gerenciar a contagem de recitativos (jovens que recitam versículos bíblicos) durante os cultos da igreja.

![Interface do Sistema](https://github.com/user-attachments/assets/96162bef-b192-4f09-a295-0d0a590622b1)

### O que o sistema faz:

- **Contagem por Categorias**: Registra a quantidade de recitativos divididos por:
  - Meninas
  - Moças (jovens mulheres)
  - Meninos  
  - Moços (jovens homens)

- **Gestão por Data**: Permite salvar e consultar contagens específicas por data

- **Cálculos Automáticos**: Calcula automaticamente totais por categoria e total geral

- **Interface Intuitiva**: Interface web responsiva para facilitar o uso durante os cultos

## Tecnologias Utilizadas

### Backend
- **ASP.NET MVC 5** - Framework web principal
- **Entity Framework 6** - ORM para acesso ao banco de dados
- **Web API 2** - API REST para comunicação frontend/backend
- **C#** - Linguagem de programação
- **SQL Server** - Banco de dados

### Frontend
- **AngularJS 1.x** - Framework JavaScript para SPA
- **Bootstrap 3** - Framework CSS responsivo
- **HTML5/CSS3** - Estrutura e estilo da interface
- **jQuery** - Biblioteca JavaScript

### Ferramentas de Build
- **Gulp** - Automatização de tarefas
- **NPM** - Gerenciamento de dependências JavaScript

## Funcionalidades Principais

### 1. Contagem de Recitativos
- Registro de quantidades por categoria (meninas, moças, meninos, moços)
- Adição/remoção dinâmica de continuações
- Mudança de categoria via dropdown
- Cálculo automático de totais

### 2. Gerenciamento por Data
- Salvamento de contagens por data específica
- Consulta de contagens históricas
- Edição de contagens existentes

### 3. API REST
Endpoints disponíveis:
- `GET /api/Recitativos` - Listar todos os recitativos
- `GET /api/Recitativos/ByDate/{day}/{month}/{year}` - Buscar por data
- `POST /api/Recitativos` - Criar novo recitativo
- `PUT /api/Recitativos/Update/{guid}` - Atualizar recitativo
- `DELETE /api/Recitativos/Delete/{guid}` - Excluir recitativo

## Estrutura do Projeto

```
MarcarRecitativos/
├── Controllers/              # Controladores da API e MVC
│   ├── HomeController.cs    # Controlador principal MVC
│   ├── RecitativosController.cs  # API REST para recitativos
│   └── TesteRecitativosController.cs  # Controlador OData (testes)
├── Models/                  # Modelos de dados
│   ├── Recitativo.cs       # Modelo principal do recitativo
│   ├── Gender.cs           # Enum para categorias (Menina, Moca, Menino, Moco)
│   └── CcbContext.cs       # Contexto do Entity Framework
├── Views/                   # Views do ASP.NET MVC
│   ├── Home/               # Views da página inicial
│   └── Shared/             # Layout principal com integração AngularJS
├── Scripts/                 # Scripts JavaScript
│   ├── application.dev/    # Código fonte AngularJS
│   │   └── recitativos/    # Módulo de recitativos
│   │       ├── controllers/ # Controladores AngularJS
│   │       ├── factories/   # Serviços para API
│   │       └── directives/  # Diretivas customizadas
│   ├── application.release/ # Código processado pelo Gulp
│   └── application.build/   # Código compilado final
├── Content/                 # Arquivos CSS e templates
│   └── angular/            # Templates HTML do AngularJS
│       └── recitativos/    # Templates específicos dos recitativos
├── App_Start/              # Configurações da aplicação
├── Migrations/             # Migrações do Entity Framework
└── gulpfile.js            # Configuração do Gulp para build
```

## Pré-requisitos

- **Visual Studio 2015+** ou **Visual Studio Code**
- **.NET Framework 4.6+**
- **SQL Server 2014+** ou **SQL Server LocalDB**
- **Node.js 10.x ou 12.x** (para ferramentas de build - versões mais recentes podem ter incompatibilidades com Gulp 3.x)
- **IIS Express** (incluído no Visual Studio)

> **Nota sobre Node.js**: Este projeto usa Gulp 3.x que tem incompatibilidades com Node.js 14+. Para desenvolvimento, recomenda-se usar Node.js 10.x ou 12.x, ou usar os arquivos já compilados em `Scripts/application.build/`.

## Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone https://github.com/9Brothers/CCB.git
cd CCB
```

### 2. Configurar Banco de Dados
1. Abrir o arquivo `Web.config`
2. Ajustar a connection string para seu SQL Server:
```xml
<connectionStrings>
  <add name="DefaultConnection" 
       connectionString="Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=CCB_DB;Integrated Security=True"
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

### 3. Instalar Dependências
```bash
# Instalar dependências JavaScript
cd MarcarRecitativos/MarcarRecitativos
npm install

# Restaurar pacotes NuGet no Visual Studio
# Ou via Package Manager Console:
Update-Package -reinstall
```

### 4. Executar Migrações
```bash
# No Package Manager Console do Visual Studio:
Enable-Migrations
Update-Database
```

### 5. Build dos Assets (Opcional)
```bash
# Nota: Requer Node.js 10.x/12.x devido ao Gulp 3.x
# Os arquivos já estão compilados em Scripts/application.build/

# Se necessário recompilar:
gulp sourcemaps
gulp scripts
```

## Executando a Aplicação

### Via Visual Studio
1. Abrir `MarcarRecitativos.sln`
2. Definir `MarcarRecitativos` como projeto de inicialização
3. Pressionar F5 para executar

### Via Command Line
```bash
cd MarcarRecitativos/MarcarRecitativos
dotnet run
```

A aplicação estará disponível em `http://localhost:porta/`

## Uso da Aplicação

## Uso da Aplicação

### Navegação
- **URL Base**: `http://localhost:porta/`
- **Página de Contagem**: `http://localhost:porta/Contagem`
- **Contagem por Data**: `http://localhost:porta/Contagem/dia/mes/ano`

### Tela Principal de Contagem
Como mostrado na imagem acima, a interface principal possui:

1. **Cabeçalho**: Mostra o nome da congregação e a data atual
2. **Seção Meninas e Moças**: 
   - Campos para inserir quantidades
   - Dropdown para alternar entre "Meninas" e "Moças"
   - Cálculo automático de totais por categoria
   - Botão para adicionar mais linhas
3. **Seção Meninos e Moços**: Similar à seção feminina
4. **Total Geral**: Soma automática de todas as categorias
5. **Botões de Ação**: Salvar ou atualizar contagem

### Fluxo de Trabalho Típico
1. **Início do Culto**: Acessar `/Contagem` no navegador
2. **Durante o Culto**: 
   - Adicionar linhas conforme necessário
   - Inserir quantidades de recitativos por categoria
   - Observar totais sendo calculados automaticamente
3. **Final do Culto**: Clicar em "Salvar Contagem"
4. **Consulta Posterior**: Acessar data específica para visualizar/editar

### Adicionando Contagens
1. Clique em "Adicionar continuação" na seção desejada
2. Selecione a categoria no dropdown (menina/moça ou menino/moço)
3. Insira a quantidade no campo numérico
4. Repita para todas as "continuações" (grupos) de recitativos
5. Clique em "Salvar Contagem" para persistir os dados

### Editando Contagens Existentes
1. Acesse uma data que já possui contagem salva
2. O sistema detecta automaticamente e carrega os dados
3. Modifique os valores conforme necessário
4. Clique em "Atualizar Contagem" para salvar as alterações

## Desenvolvimento

### Estrutura de Dados
O modelo principal é `Recitativo`:
```csharp
public class Recitativo
{
    public int RecitativoID { get; set; }        // ID único do registro
    public Guid RecitativoGUID { get; set; }     // GUID para identificação externa
    public Gender Gender { get; set; }           // Categoria (Menina=0, Moca=1, Menino=2, Moco=3)
    public int Total { get; set; }               // Quantidade de recitativos
    public DateTime Date { get; set; }           // Data do registro
}
```

### Principais Arquivos de Configuração
- `Web.config` - Configurações da aplicação e connection strings
- `gulpfile.js` - Tarefas de build e processamento de assets
- `package.json` - Dependências do Node.js
- `packages.config` - Pacotes NuGet do .NET

### Comandos Gulp Disponíveis
```bash
gulp libraries         # Compilar bibliotecas (jQuery, AngularJS, Bootstrap)
gulp geral-app         # Compilar funções gerais da aplicação
gulp geral-recitativos # Compilar funções específicas dos recitativos
gulp main-app          # Compilar aplicação principal AngularJS
gulp directives        # Compilar diretivas personalizadas
gulp factories         # Compilar serviços/factories
gulp controllers       # Compilar controladores
gulp sourcemaps        # Gerar sourcemaps do código dev -> release
gulp scripts           # Compilar todos os scripts (executa todas as tarefas acima)
gulp watch             # Observar mudanças e recompilar automaticamente
```

### Fluxo de Build
1. Código fonte em `Scripts/application.dev/`
2. Processamento via `gulp sourcemaps` → `Scripts/application.release/`
3. Compilação via `gulp scripts` → `Scripts/application.build/`
4. Arquivos finais concatenados em `build-app.js` e `build-libraries.js`

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -am 'Adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes de Contribuição
- Seguir os padrões de código existentes
- Testar alterações em ambiente local
- Documentar novas funcionalidades
- Manter compatibilidade com versões anteriores
- Considerar impacto em performance durante cultos

## Roadmap e Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Relatórios e estatísticas por período
- [ ] Exportação de dados (Excel, PDF)
- [ ] Backup automático de dados
- [ ] Interface mobile otimizada
- [ ] Múltiplas congregações
- [ ] Autenticação de usuários
- [ ] Logs de auditoria

### Melhorias Técnicas
- [ ] Migração para ASP.NET Core
- [ ] Atualização para versões mais recentes do AngularJS ou migração para Angular
- [ ] Implementação de testes automatizados
- [ ] Containerização com Docker
- [ ] CI/CD pipeline

## Autor

**Heber Teixeira** - Desenvolvedor principal

## Licença

Este projeto está licenciado sob a licença ISC.

## Contato e Suporte

Para dúvidas sobre o uso do sistema ou sugestões de melhorias, entre em contato através do GitHub Issues deste repositório.

---

*Desenvolvido com ❤️ para a Congregação Cristã no Brasil (CCB) para facilitar o controle e registro de recitativos durante os cultos.*