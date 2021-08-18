import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import { addRecord, deleteRecord, getRecords, updateRecord } from "../actions/recordActions";
import { AppState } from "../store";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { Record, RecordForm } from "../types/record";


const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0,
}

function Records() {
    const { data, loading, error } = useSelector((state: AppState) => state.records);

    const { data: categories } = useSelector((state: AppState) => state.categories);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [mode, setMode] = useState<Mode>("new");

    const [form, setForm] = useState<RecordForm>(emptyForm);
    const [updateID, setUpdateID] = useState<number | null>(null);
    const [deleteID, setDeleteID] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode);
    };

    const handleOk = () => {
        if (mode === "new")
            dispatch(addRecord(form));
        else if (mode === "edit" && typeof updateID === 'number')
            dispatch(updateRecord(form, updateID));
        else if (mode === "delete" && typeof deleteID === 'number')
            dispatch(deleteRecord(deleteID));
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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: Record["amount"], record: Record) => {
                return <>{Intl.NumberFormat('tr-TR', { style: "currency", currency: "TRY" }).format(amount)}</>;
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category: Category, record: Record) => {
                return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Last Update",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (updatedAt: string, record: Record) => {
                const updatedAtObj = new Date(updatedAt);
                return <>{updatedAtObj.toLocaleDateString() + " - " + updatedAtObj.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Record) => {
                const { title, amount } = record;
                const category_id = record.category.id;
                return (
                    <Space size="middle">
                        <EditFilled style={{ color: "#0380fc" }} onClick={() => {
                            showModal("edit");
                            setForm({ title, amount, category_id });
                            setUpdateID(record.id);
                        }} />
                        <DeleteFilled style={{ color: "darkred" }} onClick={() => {
                            showModal("delete");
                            setDeleteID(record.id);
                        }} />
                    </Space>
                )
            },
        },
    ];

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecords());
        !categories.length && dispatch(getCategories());
    }, []);

    const isFormValid = !(!form.title || form.amount === 0 || form.category_id === 0);

    return (
        <React.Fragment>
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                    <Button type="primary" onClick={() => showModal("new")}>
                        New Record
                    </Button>
                </div>
                <Modal title={mode === "new" ? "Create New Record" : mode === "edit" ? "Update Record" : "Delete Record"}
                    okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    {mode === "new" || mode === "edit" ?
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            <Form.Item label="Title" required>
                                <Input name="title" value={form.title} onChange={
                                    (e) => setForm({ ...form, title: e.target.value })
                                }></Input>
                            </Form.Item>
                            <Form.Item label="Amount" required>
                                <Input name="amount" type="number" value={form.amount} onChange={
                                    (e) => setForm({ ...form, amount: Number(e.target.value) })
                                }></Input>
                            </Form.Item>
                            <Form.Item label="Category">
                                <Select
                                    defaultValue={form.category_id}
                                    value={form.category_id}
                                    onChange={(category_id) => setForm({ ...form, category_id })}
                                >
                                    <Select.Option value={0} disabled>
                                        Select a category
                                    </Select.Option>
                                    {categories.map((category) => {
                                        return (
                                            <Select.Option value={category.id} key={category.id}>
                                                {category.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>

                        </Form>
                        : mode === "delete" ? <>Are you sure?</> : null}
                </Modal>
            </div>
            <Table loading={loading} columns={columns} dataSource={data} rowKey ="id"/>
        </React.Fragment>
    );
}

export default Records;