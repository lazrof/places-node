# flask-mongodb

# DB

## Collections (se puede decir que son los modelos, o las tablas)
- users
- products
- categories
- orders

### Documents (son los datos de las collections pero en JSON)
- {}, {}, {}, {}

#Comandos 

## Crear base de Datos
```use dataBaseName```

## Iniciales
```db```
```db.help()```
```show dbs```
```show collections```

`db.createCollection("users")` // crea un collection para la base de datos que está siendo utilizada
`db.users.drop()` // borra el collection
`db.dropDatabase()`  // Borra la base de datos que está siendo utilizada

## Insertar Datos (Create)
```
db.products.insert({
    "name": "Nunzio"
    "age": 23
})
```

// Multiples datos
```
db.users.insert([{
    "name": "Nunzio"
    "age": 23
},
{
    "name": "Nunzio"
    "age": 23
}
])
```

## Buscar (Read)
`db.products.find()`
`db.products.findOne()` // devuelve el primero que cumpla con la busqueda
`db.products.find().pretty()` // Nos devuelve la data pretty printed

`db.users.find({name: "Nunzio"})` // Es para hacer una consulta, se parece al Model.objects.filter(name="algo")
`db.products.find({"tags":"computers", "name":"monitor"})` // podemos hacer busqueda mas complejas en este tags es un array, mongo busca el value que le pasamos dentro del array.


- Slicing de los valores del resultado, el segundo parametro que recibe .find() define que valores del objeto quiero recibir, cuando se coloca el "key":1, si "key":0 no me duelve ese valor.
`db.products.find({"tags":"computers"}, {"name":1, "description":1, "_id":0})`

- Sort, es como decir sort by name
`db.products.find({"tags":"computers"}).sort({"name":1})`

- Utiles
`db.products.find().limit(2)`
`db.products.count()`

- Funciones
`db.products.find().forEach( product => print("Product Name: " + product.name))` // podemos usar funciones con codigo de JS para imprimir cosas custom, ademas no existe console.log(), sino print()

## Update
db.products.update(**lo que voy a buscar**, **por lo que voy a reemplazar**), esto reemplaza el documento entero 
`db.products.update({"name":"keyboard"}, {"price": 9999.9})`

- Reemplazar un solo key del documento
`db.products.update({"name":"keyboard"}, {$set: {"price": 100.00}})`

- Insertar si no existe 
`db.products.update({"name":"desktop"}, {$set: {"name": "gaming desktop"}}, {upsert:true})`

- Renombrar una propiedad
`db.products.update({"name":"desktop"}, {$rename: {"name": "nombre"}})`

- Incrementar un numero
`db.products.update({"name":"keyboard"}, {$inc: {"price": 1"}})`

## Remove
// Borrará todos los documentos que cumplan con el query
`db.products.remove({"name":"keyboard"})`

- Eliminar todos los documentos de un collection
`db.products.remove({})`


# Ejemplo de Data que puede recibir mongo
```
{
    "name": "Nunzio Ruffo",
    "price": 49.1,
    "created_at": new Data("12/12/2019"),
    "items": [1, 2, 3],
    "location": {
        "city":"Miammi",
        "state": "Florida"
    } 
}
```