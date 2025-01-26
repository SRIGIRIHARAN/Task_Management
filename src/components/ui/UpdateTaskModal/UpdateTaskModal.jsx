import React, { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IoClose } from 'react-icons/io5';

function UpdateTaskModal({ show, handleClose, handleUpdate, selectedTask }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        startDate: '',
        status: '',
        attachment: null,
        attachmentPreview: null,
    });
    const [activeTab, setActiveTab] = useState("details");
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                attachment: file,
                attachmentPreview: URL.createObjectURL(file),
            }));
            if (errors.attachment) {
                setErrors(prev => ({ ...prev, attachment: '' }));
            }
        }
    };

    const handleRemoveAttachment = () => {
        setFormData(prev => ({
            ...prev,
            attachment: null,
            attachmentPreview: null,
        }));
    };

    useEffect(() => {
        if (selectedTask) {
            setFormData({
                title: selectedTask.title,
                description: selectedTask.description || '',
                category: selectedTask.category,
                startDate: selectedTask.date,
                status: selectedTask.status,
                attachment: selectedTask.attachment,
                attachmentPreview: selectedTask.attachmentPreview,
            });
        }
    }, [selectedTask]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Task title is required.';
        if (!formData.description.trim()) newErrors.description = 'Task description is required.';
        if (!formData.category) newErrors.category = 'Task category is required.';
        if (!formData.startDate) newErrors.startDate = 'Start date is required.';
        if (!formData.status) newErrors.status = 'Task status is required.';
        if (!formData.attachment) newErrors.attachment = 'An attachment is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleUpdate(formData);
        }
    };

    const isFormValid = Object.keys(errors).length === 0 &&
        formData.title &&
        formData.description &&
        formData.category &&
        formData.startDate &&
        formData.status &&
        formData.attachment;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dateFormatted = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
        const timeFormatted = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return { dateFormatted, timeFormatted };
    };

    const { dateFormatted, timeFormatted } = formatDate(formData.startDate);

    return (
        <Modal show={show} onHide={handleClose} size="lg" dialogClassName="update-task-modal" centered>
            <Modal.Header>
                <Modal.Title>Update Task</Modal.Title>
                <button className="close-btn" onClick={handleClose}>
                    <IoClose />
                </button>
            </Modal.Header>
            <div className="row">
                <div className='col-md-8'>
                    <div className="update-task-modal-mobile-head desktop-hide tab-hide">
                        <button className={`mobile-tab-btn ${activeTab === "details" ? 'active' : ''}`} onClick={() => setActiveTab('details')}>Details</button>
                        <button className={`mobile-tab-btn ${activeTab === "activity" ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>Activity</button>
                    </div>
                    {activeTab === "details" && (
                        <div className="update-task-modal-wrapper">
                            <Modal.Body>
                                <Form className='w-100' onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Task title"
                                            isInvalid={!!errors.title}
                                        />
                                        {errors.title && <div className="text-danger">{errors.title}</div>}
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={formData.description || ''}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFormData(prev => ({
                                                    ...prev,
                                                    description: data,
                                                }));
                                                if (errors.description) {
                                                    setErrors(prev => ({ ...prev, description: '' }));
                                                }
                                            }}
                                        />
                                        {errors.description && <div className="text-danger">{errors.description}</div>}
                                    </Form.Group>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Task Category*</Form.Label>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        type="button"
                                                        className={`category-btn ${formData.category === 'work' ? 'active' : ''}`}
                                                        onClick={() => handleInputChange({ target: { name: 'category', value: 'work' } })}
                                                    >
                                                        Work
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`category-btn ${formData.category === 'personal' ? 'active' : ''}`}
                                                        onClick={() => handleInputChange({ target: { name: 'category', value: 'personal' } })}
                                                    >
                                                        Personal
                                                    </button>
                                                </div>
                                                {errors.category && <div className="text-danger">{errors.category}</div>}
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Due on*</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.startDate}
                                                    required
                                                />
                                                {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-4">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Task Status*</Form.Label>
                                                <Form.Select
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                    isInvalid={!!errors.status}
                                                    required
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="to-do">To-Do</option>
                                                    <option value="in-progress">In-Progress</option>
                                                    <option value="completed">Completed</option>
                                                </Form.Select>
                                                {errors.status && <div className="text-danger">{errors.status}</div>}
                                            </Form.Group>
                                        </div>
                                    </div>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Attachment</Form.Label>
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="fileInput"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            <div className="upload-field" onClick={() => document.getElementById('fileInput').click()}>
                                                Drop your files here or <span className="s-text-2">Update</span>
                                            </div>
                                            {formData.attachmentPreview && (
                                                <div className="upload-img-div">
                                                    <img src={formData.attachmentPreview} alt="Uploaded Attachment" />
                                                    <button
                                                        type="button"
                                                        className="upload-remove-btn"
                                                        onClick={handleRemoveAttachment}
                                                    >
                                                        <IoClose />
                                                    </button>
                                                </div>
                                            )}
                                            {errors.attachment && <div className="text-danger">{errors.attachment}</div>}
                                        </div>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </div>
                    )}

                    {activeTab === "activity" && (
                        <div className="activity-wrapper">
                            <div className='activity-head mobile-hide'>Activity</div>
                            <div className='activity-body'>
                                <div className='activity-body-item'>
                                    <p className='p-text-4'>You created this task</p>
                                    <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                                </div>
                                <div className='activity-body-item'>
                                    <p className='p-text-4'>You changed status from in progress to complete</p>
                                    <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                                </div>
                                <div className='activity-body-item'>
                                    <p className='p-text-4'>You uploaded file</p>
                                    <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='col-md-4 mobile-hide'>
                    <div className="activity-wrapper">
                        <div className='activity-head'>Activity</div>
                        <div className='activity-body'>
                            <div className='activity-body-item'>
                                <p className='p-text-4'>You created this task</p>
                                <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                            </div>
                            <div className='activity-body-item'>
                                <p className='p-text-4'>You changed status from in progress to complete</p>
                                <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                            </div>
                            <div className='activity-body-item'>
                                <p className='p-text-4'>You uploaded file</p>
                                <span className='s-text-4'>{`${dateFormatted} at ${timeFormatted}`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal.Footer>
                <button className='cancel-btn' onClick={handleClose}>
                    Cancel
                </button>
                <button
                    className={`create-btn ${!isFormValid ? 'disable' : ''}`}
                    disabled={!isFormValid}
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateTaskModal;
