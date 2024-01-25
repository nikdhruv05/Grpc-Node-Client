const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./todo.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});


const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var todoService = protoDescriptor.TodoService;

const client = new todoService('localhost:50051', grpc.credentials.createInsecure());

client.listTodos({}, (err, todos) => {
    if(!err){
        console.log(todos);
        client.createTodo({id: '3', title: 'third todo', content: 'something as content'}, (err, todo) => {
            if(!err){
                console.log('Created a new todo');
                client.listTodos({}, (err, todos) => {
                    console.log('After insertion', todos);
                })
            } else {
                console.log(err);
            }
        });
    }
})