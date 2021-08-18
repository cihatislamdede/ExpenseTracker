import { Button, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getCategories } from '../actions/categoryActions';
import { AppState } from '../store';
import { Category, CategoryForm } from '../types/category';
import { GithubPicker } from 'react-color';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { updateCategory,deleteCategory } from '../actions/categoryActions';
import { Mode } from '../types/general';



const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black",
}

function Categories() {
    const { data, loading, error } = useSelector((state: AppState) => state.categories);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [mode, setMode] = useState<Mode>("new");

    const [form, setForm] = useState<CategoryForm>(emptyForm);

    const [updateID, setUpdateID] = useState<number | null>(null);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode);
    };

    const handleOk = () => {
        if (mode === "new")
            dispatch(addCategory(form));
        else if (mode === "edit" && typeof updateID === 'number')
            dispatch(updateCategory(form, updateID));
        else if(mode === "delete" && typeof deleteID === 'number')
            dispatch(deleteCategory(deleteID));
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateID(null);
        setDeleteID(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateID(null);
        setDeleteID(null);
    };


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string, category: Category) => {
                return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditFilled style={{ color: "#0380fc" }} onClick={() => {
                        showModal("edit");
                        setForm(category);
                        setUpdateID(category.id);
                    }} />
                    <DeleteFilled style={{ color: "darkred" }} onClick={() => {
                        showModal("delete");
                        setDeleteID(category.id);

                    }} />
                </Space>
            ),
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [])

    return (
        <React.Fragment>
            <div>
                <div style = {{display:"flex", justifyContent :"flex-end", marginBottom:20}}>
                <Button type="primary" onClick={() => showModal("new")}>
                    New Category
                </Button>
                </div>
                <Modal title={mode === "new" ? "Create New Category" : mode ==="edit" ? "Update Category" : "Delete Category"}
                    okButtonProps={{ disabled: !(mode === "delete") && !form.name}}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                        {mode === "new" || mode ==="edit" ?
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item label="Category Name" required>
                            <Input name="name" value={form.name} onChange={
                                (e) => setForm({ ...form, name: e.target.value })
                            }></Input>
                        </Form.Item>
                        <Form.Item label="Category Type">
                            <Select defaultValue="expense" value={form.type} onChange={type => setForm({ ...form, type })}>
                                <Select.Option value="income">Income</Select.Option>
                                <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Color">
                            <GithubPicker color={form.color} colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6']} onChange={(color) => setForm({ ...form, color: color.hex })} />
                        </Form.Item>
                    </Form> 
: mode ==="delete" ? <>Are you sure?</> : null}
                </Modal>
            </div>
            <Table loading={loading} columns={columns} dataSource={data} rowKey ="id" />
        </React.Fragment>

    );
}

export default Categories;