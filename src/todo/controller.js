import rest from 'rest';

export const fetchTodo = () => {
    return rest({method: 'GET', path: '/todobackend/todo'});
}

export const createTodo = (body) => {
    return rest({
        method: 'POST', 
        path:'/todobackend/todo/create',
        entity: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
}

export const updateTodo = (body) => {
    return rest({
        method: 'PUT', 
        path:'/todobackend/todo/update',
        entity: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
}

export const deleteTodo = (id) => {
    return rest({
        method: 'DELETE', 
        path:"/todobackend/todo/delete",
        entity: JSON.stringify({usuario:{id:id}}),
        headers: {'Content-Type': 'application/json'}
    });
}