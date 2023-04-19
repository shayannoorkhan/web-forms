import React from 'react'
import { Select, Input, Button, Row, Col, Collapse } from 'antd'
import ALDv2_1 from './forms/ALDv2_1';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { baseUrl } from './helper';
import moment from 'moment'
import GeneralInfo from './forms/GeneralInfo';
import Tox from './forms/Tox';
import Environment from './forms/Environment';
const { Panel } = Collapse;

const Home = () => {

    const [data, setData] = useState([])
    const [activeCode, setActiveCode] = useState(null)
    const [valueForms, setValueForms] = useState([])
    const [generalInfoForms, setGeneralInfoForms] = useState([])
    const [toxForms, setToxForms] = useState([])
    const [environmentForms, setEnvironmentForms] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([])
    const text = 'ALD Report to Generate'

    function getDataFromApi() {
        setLoading(true)
        if (activeCode) {
            const response = axios.get(baseUrl + `data/${activeCode}`)
                .then((resp) => {
                    setData(resp.data)
                    setTableData(resp.data[0])
                    setLoading(false)
                })
        } else {
            const response = axios.get(baseUrl + `data`)
                .then((resp) => {
                    setData(resp.data)
                    setTableData(resp.data[0])
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        if (data) {
            const filterValueForms = data?.filter(item => item['ALD Report to Generate'] === 'Value')
            setValueForms(filterValueForms)
            const filterGenInfoForms = data?.filter(item => item['ALD Report to Generate'] === 'General Info')
            setGeneralInfoForms(filterGenInfoForms)
            const filterToxForms = data?.filter(item => item['ALD Report to Generate'] === 'TOX')
            setToxForms(filterToxForms)
            const filterEnviroment = data?.filter(item => item['ALD Report to Generate'] === 'TOX')
            setEnvironmentForms(filterEnviroment)
        }
    }, [data])
    return (
        <div>

            <div className='form-page'>
                <div className='inner-form-div'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Dashboard</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Active Name</th>
                                <td>{!tableData ? null : tableData['Active Code']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Active Code</th>
                                <td><Input onChange={(e) => setActiveCode(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <th scope="row">Anchor Submission Number</th>
                                <td>{!tableData ? null : tableData['Anchor Submission Number']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Registered Product Numbers	</th>
                                <td>{!tableData ? null : tableData['Active Code']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Cluster</th>
                                <td>{!tableData ? null : tableData['Cluster Name']}</td>
                            </tr>
                            <tr>
                                <th scope="row">Submissions</th>
                                <td>{!tableData ? null : tableData['Submission Number']}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button className='form-button mb-3' onClick={getDataFromApi} loading={loading}>Pull Data</Button>
                    {/* <Row className='align-items-center mb-3'>
            <Col lg={4}>
              <p>Active Code:</p>
            </Col>
            <Col lg={10}>
              <Input placeholder='Active Code' onChange={(e) => setActiveCode(e.target.value)} className='w-100' />
            </Col>
            <Col lg={10} style={{ textAlign: 'end' }}>
              <Button className='form-button' onClick={getDataFromApi} loading={loading}>Pull Data</Button>
            </Col>
          </Row> */}
                    <div className='forms'>
                        <Collapse accordion className='mb-3'>
                            <Panel header={`General Info`} key={2}>
                                {
                                    generalInfoForms?.length === 0 ?
                                        <p>No Data</p>
                                        :
                                        generalInfoForms?.map((form, index) => {
                                            return (
                                                <GeneralInfo form={form} index={index} date={moment(form['ALD created on']).format('DD-MM-YYYY')} />
                                            )
                                        })
                                }
                            </Panel>
                        </Collapse>

                        <Collapse accordion className='mb-3'>
                            <Panel header={`Value`} key={1}>
                                {
                                    valueForms?.length === 0 ?
                                        <p>No Data</p>
                                        :
                                        valueForms?.map((form, index) => {
                                            return (
                                                <ALDv2_1 form={form} index={index} date={moment(form['ALD created on']).format('DD-MM-YYYY')} />
                                            )
                                        })
                                }
                            </Panel>
                        </Collapse>
                        <Collapse accordion className='mb-3'>
                            <Panel header={`TOX`} key={3}>
                                {
                                    toxForms?.length === 0 ?
                                        <p>No Data</p>
                                        :
                                        toxForms?.map((form, index) => {
                                            return (
                                                <Tox form={form} index={index} date={moment(form['ALD created on']).format('DD-MM-YYYY')} />
                                            )
                                        })
                                }
                            </Panel>
                        </Collapse>
                        <Collapse accordion className='mb-3'>
                            <Panel header={`Environment`} key={4}>
                                {
                                    environmentForms?.length === 0 ?
                                        <p>No Data</p>
                                        :
                                        environmentForms?.map((form, index) => {
                                            return (
                                                <Environment form={form} index={index} date={moment(form['ALD created on']).format('DD-MM-YYYY')} />
                                            )
                                        })
                                }
                            </Panel>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home