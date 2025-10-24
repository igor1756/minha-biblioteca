import React, { useState } from 'react';
import { Button, ListGroup, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Dados iniciais
const initialBooks = [
    { id: 1, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', status: 'Lido' },
    { id: 2, title: 'Duna', author: 'Frank Herbert', status: 'Lendo' },
    { id: 3, title: 'O Guia do Mochileiro das Galáxias', author: 'Douglas Adams', status: 'Para Ler' }
];


const BookList = () => {

    const [books, setBooks] = useState(initialBooks);
    const [newBook, setNewBook] = useState({ title: '', author: '', status: 'Para Ler' });

    const [showAddModal, setShowAddModal] = useState(false);
    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingBook(null);
    };

    const handleShowEditModal = (book) => {
        setEditingBook(book);
        setShowEditModal(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingBook({ ...editingBook, [name]: value });
    };

    const handleUpdateBook = () => {
        {/* Atualiza o livro na lista */ }
        {/* com um array de livros retornado pelo map */ }
        {/* compara o id do livro com o livro que esta sendo editado. Se for igual, atualiza a lista */ }
        setBooks(books.map(book => (book.id === editingBook.id ? editingBook : book)));
        handleCloseEditModal();
    };

    const handleDeleteBook = (bookId) => {
        if (window.confirm(`Tem certeza que deseja excluir o livro "${editingBook.title}"?`)) {
            setBooks(books.filter(book => book.id !== bookId));
            handleCloseEditModal();
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    }

    const handleSaveBook = () => {
        setBooks([...books, { id: Date.now(), ...newBook }]);
        handleCloseAddModal();
        setNewBook({ title: '', author: '', status: 'Para Ler' });
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/">
                    <Button variant='outline-dark' className='me-2'>Página Inicial</Button>
                </Link>
                <h1 className="mb-4">Minha Biblioteca</h1>
                <Button variant="primary" onClick={handleShowAddModal}>Adicionar Livro</Button>
            </div>
            {/* <ListGroup className='d-flex'>
                {books.map(book => (
                    <ListGroup.Item key={book.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{book.title}</strong>
                            <br />
                            <small className="mb-1">por: {book.author}</small>
                            <br />
                            <small className="mb-3">Status: {book.status}</small>
                        </div>
                        <div>
                            <Button variant="outline-secondary" className="me-2" size='sm' onClick={() => handleShowEditModal(book)}>Editar</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup> */}
            <Row xs={2} md={3} className="g-4">
                {books.map(book => (
                    <Col key={book.id}>
                        <Card>
                            {/* <Card.Img variant="top" src="holder.js/100px160" />  */}
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                    {`por: ${book.author}`}
                                </Card.Text>
                                <Card.Text>
                                    {`Status: ${book.status}`}
                                </Card.Text>
                                <div>
                                    <Button 
                                        variant="outline-secondary" 
                                        className="me-2" 
                                        size='sm' 
                                        onClick={() => handleShowEditModal(book)}
                                    >
                                        Editar
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Novo Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBookTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o título do livro"
                                name="title"
                                value={newBook.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookAuthor">
                            <Form.Label>Autor</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o autor do livro"
                                name="author"
                                value={newBook.author}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBookStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="status"
                                value={newBook.status}
                                onChange={handleInputChange}
                            >
                                <option value="Para Ler">Para Ler</option>
                                <option value="Lendo">Lendo</option>
                                <option value="Lido">Lido</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveBook}>
                        Salvar Livro
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingBook && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formEditBookTitle">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o título do livro"
                                    name="title"
                                    value={editingBook.title}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEditBookAuthor">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Digite o autor do livro"
                                    name="author"
                                    value={editingBook.author}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEditBookStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="status"
                                    value={editingBook.status}
                                    onChange={handleEditInputChange}
                                >
                                    <option value="Para Ler">Para Ler</option>
                                    <option value="Lendo">Lendo</option>
                                    <option value="Lido">Lido</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDeleteBook(editingBook.id)}>
                        Excluir
                    </Button>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateBook}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BookList;