import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddTaskModal({ show, handleClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        startDate: '',
        endDate: '',
        attachment: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            attachment: e.target.files[0]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = [...existingTasks, formData];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        console.log('Task saved to localStorage:', formData);
        handleClose();
    };


    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Task Description</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData(prev => ({
                                    ...prev,
                                    description: data
                                }));
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="development">Development</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Attachment</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                        />
                        {formData.attachment && (
                            <div className="mt-2">
                                <small className="text-muted">
                                    Selected file: {formData.attachment.name}
                                </small>
                            </div>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTaskModal;