import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, message, Input, Select, DatePicker } from 'antd'
import Form4 from './valuePopups/Form4'
import Form2 from './valuePopups/Form2'
import Form3 from './valuePopups/Form3'
import CommentBox from './CommentBox'
import { baseUrl} from './helper'

const ValueFormDetails = () => {
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false)
    const param = useParams();
    const [form2, setForm2] = useState(false)
    const [form3, setForm3] = useState(false)
    const [form4, setForm4] = useState(false)
    const [form2Data, setForm2Data] = useState([])
    const [form3Data, setForm3Data] = useState([])
    const [form4Data, setForm4Data] = useState([])
    const [formProp, setFormProp] = useState({})
    const [approvalBody, setApprovalBody] = useState()
    const [comments, setComments] = useState()

    function getComments() {
        axios.get(`${baseUrl}sectionheadfeedback/${param.submissionNumber}/Value`)
            .then((resp) => {
                setComments(resp.data[0])
            }).catch((err) => {
                console.log('error')
            })
    }

    useEffect(() => {
        if (tableData) {
            const obj = {
                "SubmissionNumber": param.submissionNumber,
                "Comments": "",
                "Feedback": "Pending",
                "DateofFeedback": "",
                "activeCode": tableData?.['Active Code'],
                "Form": "TOX",
                "FormLink": `${window.location.href}?shmode=1`,
                "SectionHeadName": tableData?.['ALD Approved By'],
                "EvaluatorName": tableData?.Evaluator,
                "updated": moment().format('YYYY-MM-DD'),
                "flags": 0,
                "id": 0
            }
            setApprovalBody(obj)
        }
    }, [tableData])


    function handleApproval() {
        setLoading(true)
        axios.put(`${baseUrl}sectionheadfeedback/${approvalBody.id}`, approvalBody)
            .then((resp) => {
                setLoading(false)
                message.success('Requested for approval')
            }).catch((err) => {
                setLoading(false)
                message.erorr('Error')
            })
    }

    function updateTableData() {
        tableData['ALD Last Updated on'] = moment(tableData['ALD Last Updated on']).format('YYYY-MM-DD')
        tableData['ALD created on'] = moment(tableData['ALD created on']).format('YYYY-MM-DD')
        tableData['Initiation Date'] = moment(tableData['Initiation Date']).format('YYYY-MM-DD')
        tableData['SMC BN2 Date'] = moment(tableData['SMC BN2 Date']).format('YYYY-MM-DD')
        tableData['SMC BN1 Date'] = moment(tableData['SMC BN1 Date']).format('YYYY-MM-DD')
        tableData['Next Assessment Date'] = moment(tableData['Next Assessment Date']).format('YYYY-MM-DD')

        setLoading(true)
        axios.put(`${baseUrl}data/${param.submissionNumber}`, tableData)
            .then((resp) => {
                getFormData()
                setLoading(false)
                message.success('Updated')
            })
            .catch((err) => {
                setLoading(false)
                message.error('Error')
            })
    }

    function getFormData() {
        axios.get(`${baseUrl}value/${param.submissionNumber}`)
            .then((resp) => {
                const filterGenInfoForms = resp.data?.filter(item => item['ALD Report to Generate'] === 'Value')
                setTableData(filterGenInfoForms[0])
            })
    }

    function getForm2Data() {
        axios.get(`${baseUrl}valuesection2/${param.submissionNumber}`)
            .then((resp) => {
                setForm2Data(resp.data)
            })
    }

    function deleteForm2Data(id) {
        axios.delete(`${baseUrl}valuesection2/${id}`)
            .then((resp) => {
                getForm2Data()
                message.success('Record Deleted')
            })
    }

    function getForm3Data() {
        axios.get(`${baseUrl}valuesection3/${param.submissionNumber}`)
            .then((resp) => {
                setForm3Data(resp.data)
            })
    }

    function deleteForm3Data(id) {
        axios.delete(`${baseUrl}valuesection3/${id}`)
            .then((resp) => {
                getForm3Data()
                message.success('Record Deleted')
            })
    }

    function getForm4Data() {
        axios.get(`${baseUrl}valuesection4/${param.submissionNumber}`)
            .then((resp) => {
                setForm4Data(resp.data)
            })
    }

    function deleteForm4Data(id) {
        axios.delete(`${baseUrl}valuesection4/${id}`)
            .then((resp) => {
                getForm4Data()
                message.success('Record Deleted')
            })
    }


    useEffect(() => {
        getFormData()
        getForm2Data()
        getForm3Data()
        getForm4Data()
        getComments()
    }, [])

    function handleTableData(name, value) {
        setTableData({ ...tableData, [name]: value })
    }

    function handlebn1Date(date, dateString) {
        handleTableData('SMC BN1 Date', dateString)
    }

    function handlebn2Date(date, dateString) {
        handleTableData('SMC BN2 Date', dateString)
    }

    function handlenextDate(date, dateString) {
        handleTableData('Next Assessment Date', dateString)
    }

    return (
        <div className='form-detail'>
            <div className='box mt-5'>
                <div className='d-flex align-items-center justify-content-between'>
                    <p style={{ fontSize: '18px' }} className="mb-3">1. Main</p>
                    <div className='d-flex align-items-center'>
                        <Button onClick={() => window.print()} className='form-button'>Print Form</Button>
                        <Button className='form-button' onClick={() => handleApproval()} disabled={loading} loading={loading}>Request Approval</Button>
                    </div>
                </div>
                <table className="table table-bordered table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Anchor Submission Number:</th>
                            <td><Input value={tableData && tableData['Anchor Submission Number']} onChange={(e) => handleTableData('Anchor Submission Number', e.target.value)} />
                                {/* {!tableData ? null : tableData['Anchor Submission Number']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Report to Generate:	</th>
                            <td>{!tableData ? null : tableData['ALD Report to Generate']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Evaluator:	</th>
                            <td>{!tableData ? null : tableData['Evaluator']}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Required:	</th>
                            <td>{!tableData ? null : tableData['ALD Required'] === 1 ? 'Yes' : 'No'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Program Activity:	</th>
                            <td>{!tableData ? null : tableData['Program Activity']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Active Code:	</th>
                            <td>{!tableData ? null : tableData['Active Code']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Active Name:		</th>
                            <td>{!tableData ? null : tableData['Active Name']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Cluster Name:		</th>
                            <td>{!tableData ? null : tableData['Cluster Name']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Related Submission Numbers:		</th>
                            <td>{!tableData ? null : tableData['Related Submission Numbers']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Initiation Date:			</th>
                            <td>{!tableData ? null : moment(tableData['Initiation Date']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Number:		</th>
                            <td>{!tableData ? null : tableData['ALD Number']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Submission Category:		</th>
                            <td>{!tableData ? null : tableData['Submission Category']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Submission Type:		</th>
                            <td>{!tableData ? null : tableData['Submission Type']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Level:		</th>
                            <td>{!tableData ? null : tableData['Level']}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD created on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD created on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Last Updated on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD Last Updated on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Approved on:		</th>
                            <td>{!tableData ? null : moment(tableData['ALD Approved on']).format('DD-MM-YYYY')}</td>
                        </tr>
                        <tr>
                            <th scope="row">ALD Approved By:		</th>
                            <td>{!tableData ? null : tableData['ALD Approved By']}</td>
                        </tr>
                        <tr>
                            <th scope="row">Evaluator Sub-Group:		</th>
                            <td>{!tableData ? null : tableData['Evaluator sub-Group']}</td>
                        </tr>
                        <tr>
                            <th scope="row">USCs:		</th>
                            <td><Input value={tableData && tableData['USCs']} onChange={(e) => handleTableData('USCs', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Purpose of Submission:		</th>
                            {/* <td>{!tableData ? null : tableData['Purpose of Submission']}</td> */}
                            <td>
                                <Select options={[
                                    { value: 'Major New Use', label: 'Major New Use' },
                                    { value: 'Major Use', label: 'Major Use' },
                                    { value: 'Minor Use', label: 'Minor Use' },
                                    { value: 'Re-evaluation', label: 'Re-evaluation' },
                                    { value: 'Special Review', label: 'Special Review' },
                                    { value: 'Cumulative Risk Assessment', label: 'Cumulative Risk Assessment' },
                                    { value: 'Notice of Objection-PA2', label: 'Notice of Objection-PA2' },
                                    { value: 'Notice of Objection-PA1', label: 'Notice of Objection-PA1' },
                                ]} onChange={(e) => handleTableData('Purpose of Submission', e)} value={tableData && tableData['Purpose of Submission']} className="w-100" placeholder='Purpose of Submission' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Additional Purpose of Submission Comments:		</th>
                            <td><Input value={tableData && tableData['Additional Purpose of Submission Comments']} onChange={(e) => handleTableData('Additional Purpose of Submission Comments', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Scoping Document Number:		</th>
                            <td><Input value={tableData && tableData['Scoping Document Number']} onChange={(e) => handleTableData('Scoping Document Number', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN1:		</th>
                            <td><Input value={tableData && tableData['SMC BN1']} onChange={(e) => handleTableData('SMC BN1', e.target.value)} />
                                {/* {!tableData ? null : tableData['USCs']} */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN1 Date:		</th>
                            {/* <td>{!tableData ? null : moment(tableData['SMC BN1 Date']).format('DD-MM-YYYY')}</td> */}
                            <td>
                                <DatePicker onChange={handlebn1Date}
                                    // value={tableData && tableData['SMC BN1 Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN2:		</th>
                            <td>
                                {!tableData ? null : tableData['SMC BN2']}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">SMC BN2 Date:		</th>
                            {/* <td>{!tableData ? null : moment(tableData['SMC BN2 Date']).format('DD-MM-YYYY')}</td> */}
                            <td>
                                <DatePicker onChange={handlebn2Date}
                                    // value={tableData && tableData['SMC BN2 Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Proposed Decision Document Number:		</th>
                            {/* <td>{!tableData ? null : tableData['Proposed Decision Document Number']}</td> */}
                            <td><Input value={tableData && tableData['Proposed Decision Document Number']} onChange={(e) => handleTableData('Proposed Decision Document Number', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Final Decision Document Number:		</th>
                            {/* <td>{!tableData ? null : tableData['Final Decision Document Number']}</td> */}
                            <td><Input value={tableData && tableData['Final Decision Document Number']} onChange={(e) => handleTableData('Final Decision Document Number', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Outcome:		</th>
                            {/* <td>{!tableData ? null : tableData['Outcome']}</td> */}
                            <td>
                                <Select options={[
                                    { value: 'Registered', label: 'Registered' },
                                    { value: 'Continued Registration', label: 'Continued Registration' },
                                    { value: 'Voluntarily Withdrawal', label: 'Voluntarily Withdrawal' },
                                    { value: 'PMRA Rejected', label: 'PMRA Rejected' },
                                    { value: 'Panel', label: 'Panel' },
                                    { value: 'No Panel', label: 'No Panel' },
                                    { value: 'Other', label: 'Other' },
                                ]} onChange={(e) => handleTableData('Outcome', e)} value={tableData && tableData['Outcome']} className="w-100" placeholder='Outcome' />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Additional Outcome Reasons:		</th>
                            {/* <td>{!tableData ? null : tableData['Aditional Outcome Reasons']}</td> */}
                            <td><Input value={tableData && tableData['Aditional Outcome Reasons']} onChange={(e) => handleTableData('Aditional Outcome Reasons', e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Next Assessment Date:		</th>
                            {/* <td>{!tableData ? null : tableData['Next Assessment Date']}</td> */}
                            <td>
                                <DatePicker onChange={handlenextDate}
                                    // value={tableData && tableData['Next Assessment Date']}
                                    className='w-100' />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button className='form-button' loading={loading} disabled={loading} onClick={updateTableData}>Update Record</Button>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">2. Key Value Considerations</p>
                <Button className='mb-3 form-button' onClick={() => { setForm2(true); setFormProp({}) }}>Add new section 2</Button>
                <Form2 open={form2} setOpen={setForm2} data={formProp} getFormData={getForm2Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>Reference PMRA Document Numbers Date		</td>
                                <td>Reference PMRA Document Numbers			</td>
                                <td>Comments		</td>
                                <td>Edit		</td>
                                <td>Delete		</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form2Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.Reference_PMRA_Document_Numbers_Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Reference_PMRA_Document_Numbers}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm2(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm2Data(data.id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">3. Future Considerations</p>
                <Button className='form-button mb-3' onClick={() => { setForm3(true); setFormProp({}) }}>Add New Section 3</Button>
                <Form3 open={form3} setOpen={setForm3} data={formProp} getFormData={getForm3Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <td>Study Type			</td>
                                <td>Document Type				</td>
                                <td>PMRA Number				</td>
                                <td>PMRA System Document Location	</td>
                                <td>Comments					</td>
                                <td>Edit				</td>
                                <td>Delete				</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Study_Type}</td>
                                            <td>{data?.Document_Type}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.PMRA_System_Document_Location}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm3(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3Data(data.id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">4. Additional Information</p>
                <Button className='form-button mb-3' onClick={() => { setForm4(true); setFormProp({}) }}>Add New Section 4</Button>
                <Form4 open={form4} setOpen={setForm4} data={formProp} getFormData={getForm4Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <td>Registration Number				</td>
                                <td>Reference PMRA Document Numbers					</td>
                                <td>Comments					</td>
                                <td>Edit				</td>
                                <td>Delete				</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.Reference_PMRA_Document_Numbers}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm4(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4Data(data.id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <CommentBox comments={comments} />
        </div >
    )
}

export default ValueFormDetails