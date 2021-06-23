## Installation
```bash
$ yarn
```
## Running the app

### DB
```bash
# create database and run seeder
$ yarn db

```
### Commands
```bash
# development
$ yarn develop
# run test
$ yarn test
```
## Examples
### After the application starts on the **localhost:3001/graphql** you can access the graphql interface
- Get all movies
```
query {
  listAll{
    id
    title
  }
}
```
- Get movies by actor and/or title
```

query {
  getMovies(getMovieInput:{actor:"Arden Walter",title:"Unbranded Concrete Hat"}){
    id
    title
    actors{
    name
  	}
    categories{
      name
    }
  }
}
```
- Get movie with wikipedia link
```

query {
  getWiki(getWikiInput:{title:"The godfather"}){
    link
    imdb
    description
  }
}
```
