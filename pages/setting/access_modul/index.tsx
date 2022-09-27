import {
	Button, Card, Checkbox, Form, Input, Modal, Select, Space, Table, TableColumnsType
} from 'antd';
import Search from 'antd/lib/input/Search';
import { useEffect, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { sleep } from '../../../utils/function';

interface DataSourceInterface {
	no: number,
	group_user: string,
	status: string,
	created_at: string,
	updated_at: string,
	action: string,
}
const AccessModulPage = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);

	const deleteHandler = async () => {
		Modal.confirm({
			title: "Are you sure delete this row ?",
			maskClosable: false,
			onOk: async () => {
				await sleep(5000);
			},
			onCancel: async () => {
				alert('cancel');
			}
		});
	}

	const columns: TableColumnsType<DataSourceInterface> = [
		{ key: "no", dataIndex: "no", title: "No" },
		{ key: "group_user", dataIndex: "group_user", title: "Group User" },
		{ key: "status", dataIndex: "status", title: "Status" },
		{ key: "created_at", dataIndex: "created_at", title: "Created At" },
		{ key: "updated_at", dataIndex: "updated_at", title: "UpdatedA At" },
		{
			key: "action",
			dataIndex: "action",
			title: "Aksi",
			width: 100,
			render: (val) => {
				return <Space align="center">
					<Button icon={<EditOutlined />} className="bg-info text-white" onClick={() => setIsModalOpen(true)} />
					<Button icon={<DeleteOutlined />} className="bg-error text-white" onClick={deleteHandler} />
				</Space>
			}
		},
	];

	let dataSource: DataSourceInterface[] = [

	];

	for (let i = 1; i <= 9999; i++) {
		dataSource.push({
			no: i,
			group_user: "superadmin",
			status: "Aktif",
			created_at: new Date().toDateString(),
			updated_at: new Date().toDateString(),
			action: ""
		})
	}

	return <Card>
		<div className="flex flex-col">
			<div className="flex justify-between items-center mb-5">
				<h1 className="font-medium text-base mr-5 md:text-xl">Access Modul</h1>
				<Space wrap>
				</Space>
			</div>
			<div className="flex flex-wrap items-center space-x-2 mb-5">
				<Search placeholder="Cari sesuatu..." onSearch={(e) => ''} className="w-48" allowClear />
				<Select
					defaultValue={{
						value: 0,
						label: "Pilih"
					}}
					onChange={(e) => alert(e)}
					className="w-auto md:min-w-[10rem]"  >
					<Select.Option value={0}>Pilih</Select.Option>
					<Select.Option value='active'>Aktif</Select.Option>
					<Select.Option value="not_active">Tidak Aktif</Select.Option>
				</Select>
			</div>
			<Table
				loading={false}
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: 2000 }}
				pagination={{
					total: dataSource.length,
					current: currentPage,
					pageSize: pageSize,
					showPrevNextJumpers: false,
					onChange: (page, size) => {
						setCurrentPage(page);
						alert(`onchagen ${page} ${size}`)
					},
					onShowSizeChange: (current, size) => {
						setPageSize(size);
						alert(`onchagen ${current} ${size}`)
					}
				}}
			/>
			{isModalOpen && <FormModal open={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />}

		</div>
	</Card >;
}

const FormModal = (props: {
	open: boolean, onCloseModal: () => void
}) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log(values);
	};

	useEffect(() => {
		form.setFieldsValue({
			group_user: 'superadmin',
			status: "active"
		})

		return () => {
		}
	}, [form])


	return <Modal
		title="Form Tambah"
		open={props.open}
		maskClosable={false}
		keyboard={false}
		closable={false}
		width="1000px"
		onCancel={props.onCloseModal}
		footer={
			<Space>
				<Button onClick={props.onCloseModal} >Batal</Button>
				<Button htmlType="submit" form="form_validation" className='bg-success text-white' onClick={() => alert('save!')} >Simpan</Button>
			</Space>
		}
	>
		<Form
			form={form}
			name="form_validation"
			id="form_validation"
			layout="vertical"
			onFinish={onFinish}
		>
			<Form.Item label="Group User" name="group_user" >
				<Input placeholder="" disabled />
			</Form.Item>
			<Form.Item label="Akses Modul" name="access_modul">
				<Checkbox.Group>
					<Checkbox value="1" style={{ lineHeight: '32px' }}>
						Setting
					</Checkbox>
					<Checkbox value="2" style={{ lineHeight: '32px' }}>
						Modul Lainnya
					</Checkbox>
				</Checkbox.Group>
			</Form.Item>
		</Form>
	</Modal>;
}

export default AccessModulPage;