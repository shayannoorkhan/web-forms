import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, message, Input, Select, DatePicker } from 'antd'
import Form4 from './toxPopups/Form4'
import Form5 from './toxPopups/Form5'
import Form2 from './toxPopups/Form2'
import Form22 from './toxPopups/Form22'
import Form23 from './toxPopups/Form23'
import Form24 from './toxPopups/Form24'
import Form3 from './toxPopups/Form3'
import Form8 from './toxPopups/Form8'
import Form9 from './toxPopups/Form9'
import Form10 from './toxPopups/Form10'
import Form11 from './toxPopups/Form11'
import Form6 from './toxPopups/Form6'
import Form7 from './toxPopups/Form7'
import CommentBox from './CommentBox'
import { baseUrl } from './helper'

const ToxFormDetails = () => {
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false)
    const param = useParams();
    const [form2, setForm2] = useState(false)
    const [form22, setForm22] = useState(false)
    const [form23, setForm23] = useState(false)
    const [form24, setForm24] = useState(false)
    const [form3, setForm3] = useState(false)
    const [form4, setForm4] = useState(false)
    const [form5, setForm5] = useState(false)
    const [form6, setForm6] = useState(false)
    const [form7, setForm7] = useState(false)
    const [form8, setForm8] = useState(false)
    const [form9, setForm9] = useState(false)
    const [form10, setForm10] = useState(false)
    const [form11, setForm11] = useState(false)
    const [form2Data, setForm2Data] = useState([])
    const [form22Data, setForm22Data] = useState([])
    const [form23Data, setForm23Data] = useState([])
    const [form24Data, setForm24Data] = useState([])
    const [form3Data, setForm3Data] = useState([])
    const [form4Data, setForm4Data] = useState([])
    const [form5Data, setForm5Data] = useState([])
    const [form6Data, setForm6Data] = useState([])
    const [form7Data, setForm7Data] = useState([])
    const [form8Data, setForm8Data] = useState([])
    const [form9Data, setForm9Data] = useState([])
    const [form10Data, setForm10Data] = useState([])
    const [form11Data, setForm11Data] = useState([])
    const [formProp, setFormProp] = useState({})
    const [approvalBody, setApprovalBody] = useState()
    const [comments, setComments] = useState()
    console.log(approvalBody)

    function getComments() {
        axios.get(`${baseUrl}sectionheadfeedback/${param.submissionNumber}/TOX`)
            .then((resp) => {
                setComments(resp.data[0])
                // setApprovalBody({ ...approvalBody, 'id': resp.data[0].id })
            })
    }

    useEffect(() => {
        if (tableData) {
            const obj = {
                "SubmissionNumber": param.submissionNumber,
                "Comments": comments ? comments?.Comments : "",
                "Feedback": comments ? comments?.Feedback : "Pending",
                "DateofFeedback": comments ? moment(comments.DateofFeedback).format('YYYY-MM-DD') : "",
                "activeCode": tableData?.['Active Code'],
                "Form": "TOX",
                "FormLink": `${window.location.href}?shmode=1`,
                "SectionHeadName": tableData?.['ALD Approved By'],
                "EvaluatorName": tableData?.Evaluator,
                "updated": moment().format('YYYY-MM-DD'),
                "flags": 0,
                "id": comments ? comments?.id : 0
            }
            setApprovalBody(obj)
        }
    }, [tableData, comments])

    function updateTableData() {
        tableData['ALD Last Updated on'] = tableData['ALD Last Updated on'] ? moment(tableData['ALD Last Updated on']).format('YYYY-MM-DD') : null
        tableData['ALD created on'] = tableData['ALD created on'] ? moment(tableData['ALD created on']).format('YYYY-MM-DD') : null
        tableData['Initiation Date'] = tableData['Initiation Date'] ? moment(tableData['Initiation Date']).format('YYYY-MM-DD') : null
        tableData['SMC BN2 Date'] = tableData['SMC BN2 Date'] ? moment(tableData['SMC BN2 Date']).format('YYYY-MM-DD') : null
        tableData['SMC BN1 Date'] = tableData['SMC BN1 Date'] ? moment(tableData['SMC BN1 Date']).format('YYYY-MM-DD') : null
        tableData['Next Assessment Date'] = tableData['Next Assessment Date'] ? moment(tableData['Next Assessment Date']).format('YYYY-MM-DD') : null
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
                const filterGenInfoForms = resp.data?.filter(item => item['ALD Report to Generate'] === 'TOX')
                setTableData(filterGenInfoForms[0])
            })
    }

    function getForm2Data() {
        axios.get(`${baseUrl}toxsection21summarytable/${param.submissionNumber}`)
            .then((resp) => {
                setForm2Data(resp.data)
            })
    }

    function deleteForm2Data(id) {
        axios.delete(`${baseUrl}toxsection21summarytable/${id}`)
            .then((resp) => {
                getForm2Data()
                message.success('Record Deleted')
            })
    }

    function getForm22Data() {
        axios.get(`${baseUrl}toxsections22232434data/${param.submissionNumber}`)
            .then((resp) => {
                setForm22Data(resp.data)
            })
    }

    function deleteForm22Data(id) {
        axios.delete(`${baseUrl}toxsections22232434data/${id}`)
            .then((resp) => {
                getForm22Data()
                message.success('Record Deleted')
            })
    }

    function getForm23Data() {
        axios.get(`${baseUrl}toxsections22232434data/${param.submissionNumber}`)
            .then((resp) => {
                setForm23Data(resp.data)
            })
    }

    function deleteForm23Data(id) {
        axios.delete(`${baseUrl}toxsections22232434data/${id}`)
            .then((resp) => {
                getForm23Data()
                message.success('Record Deleted')
            })
    }

    function getForm24Data() {
        axios.get(`${baseUrl}toxsections22232434data/${param.submissionNumber}`)
            .then((resp) => {
                setForm24Data(resp.data)
            })
    }

    function deleteForm24Data(id) {
        axios.delete(`${baseUrl}toxsections22232434data/${id}`)
            .then((resp) => {
                getForm24Data()
                message.success('Record Deleted')
            })
    }


    function getForm3Data() {
        axios.get(`${baseUrl}toxsections22232434data/${param.submissionNumber}`)
            .then((resp) => {
                setForm3Data(resp.data)
            })
    }

    function deleteForm3Data(id) {
        axios.delete(`${baseUrl}toxsections22232434data/${id}`)
            .then((resp) => {
                getForm3Data()
                message.success('Record Deleted')
            })
    }

    function getForm4Data() {
        axios.get(`${baseUrl}toxsections22232434data/${param.submissionNumber}`)
            .then((resp) => {
                setForm4Data(resp.data)
            })
    }

    function deleteForm4Data(id) {
        axios.delete(`${baseUrl}toxsections22232434data/${id}`)
            .then((resp) => {
                getForm4Data()
                message.success('Record Deleted')
            })
    }


    function getForm5Data() {
        axios.get(`${baseUrl}toxsection5data/${param.submissionNumber}`)
            .then((resp) => {
                setForm5Data(resp.data)
            })
    }

    function deleteForm5Data(id) {
        axios.delete(`${baseUrl}toxsection5data/${id}`)
            .then((resp) => {
                getForm5Data()
                message.success('Record Deleted')
            })
    }

    function getForm6Data() {
        axios.get(`${baseUrl}toxsection6data/${param.submissionNumber}`)
            .then((resp) => {
                setForm6Data(resp.data)
            })
    }

    function deleteForm6Data(id) {
        axios.delete(`${baseUrl}toxsection6data/${id}`)
            .then((resp) => {
                getForm6Data()
                message.success('Record Deleted')
            })
    }

    function getForm7Data() {
        axios.get(`${baseUrl}toxsection7data/${param.submissionNumber}`)
            .then((resp) => {
                setForm7Data(resp.data)
            })
    }

    function deleteForm7Data(id) {
        axios.delete(`${baseUrl}toxsection7data/${id}`)
            .then((resp) => {
                getForm7Data()
                message.success('Record Deleted')
            })
    }


    function getForm8Data() {
        axios.get(`${baseUrl}toxsection8data/${param.submissionNumber}`)
            .then((resp) => {
                setForm8Data(resp.data)
            })
    }

    function deleteForm8Data(id) {
        axios.delete(`${baseUrl}toxsection8data/${id}`)
            .then((resp) => {
                getForm8Data()
                message.success('Record Deleted')
            })
    }

    function getForm9Data() {
        axios.get(`${baseUrl}toxsection9data/${param.submissionNumber}`)
            .then((resp) => {
                setForm9Data(resp.data)
            })
    }

    function deleteForm9Data(id) {
        axios.delete(`${baseUrl}toxsection9data/${id}`)
            .then((resp) => {
                getForm9Data()
                message.success('Record Deleted')
            })
    }

    function getForm10Data() {
        axios.get(`${baseUrl}toxsection10data/${param.submissionNumber}`)
            .then((resp) => {
                setForm10Data(resp.data)
            })
    }

    function deleteForm10Data(id) {
        axios.delete(`${baseUrl}toxsection10data/${id}`)
            .then((resp) => {
                getForm10Data()
                message.success('Record Deleted')
            })
    }

    function getForm11Data() {
        axios.get(`${baseUrl}toxsection11data/${param.submissionNumber}`)
            .then((resp) => {
                setForm11Data(resp.data)
            })
    }

    function deleteForm11Data(id) {
        axios.delete(`${baseUrl}toxsection11data/${id}`)
            .then((resp) => {
                getForm11Data()
                message.success('Record Deleted')
            })
    }


    useEffect(() => {
        getFormData()
        getForm2Data()
        getForm3Data()
        getForm4Data()
        getForm5Data()
        getForm6Data()
        getForm8Data()
        getForm9Data()
        getForm10Data()
        getForm11Data()
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

    function handleApproval() {
        approvalBody.Comments = ''
        approvalBody.Feedback = 'Pending'
        setLoading(true)
        if (approvalBody?.id) {
            axios.put(`${baseUrl}sectionheadfeedback/${approvalBody?.id}`, approvalBody)
                .then((resp) => {
                    setLoading(false)
                    message.success('Requested for approval')
                    getComments()
                }).catch((err) => {
                    setLoading(false)
                    message.error('Error')
                })
        } else {
            axios.post(`${baseUrl}sectionheadfeedback`, approvalBody)
                .then((resp) => {
                    setLoading(false)
                    message.success('Requested for approval')
                    getComments()
                }).catch((err) => {
                    setLoading(false)
                    message.error('Error')
                })
        }
    }

    return (
        <div className='form-detail'>
            <div className='box mt-5'>
                <div className='d-flex align-items-center justify-content-between'>
                    <p style={{ fontSize: '18px' }} className="mb-3">1. Main</p>
                    {/* <Button onClick={() => window.print()} className='form-button'>Print Form</Button> */}
                    <div className='d-flex align-items-center'>
                        <Button onClick={() => window.print()} className='form-button'>Print Form</Button>
                        {
                            (!window.location.href.includes('shmode') && comments?.Feedback !== 'Approved') &&
                            <Button className='form-button' onClick={() => handleApproval()} disabled={loading} loading={loading}>Request Approval</Button>
                        }
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
                <p style={{ fontSize: '18px' }} className="mb-3">2.1 Summary Table</p>
                <Button className='mb-3 form-button' onClick={() => { setForm2(true); setFormProp({}) }}>Add new record</Button>
                <Form2 open={form2} setOpen={setForm2} data={formProp} getFormData={getForm2Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>CAS Number		</td>
                                <td>Exposure Scenario			</td>
                                <td>Exposure Scenario Subtype			</td>
                                <td>Study		</td>
                                <td>Point of Departure and End Point			</td>
                                <td>CAF or Target MOE			</td>
                                <td>Reference Document			</td>
                                <td>PMRA Number			</td>
                                <td>ARfD Value			</td>
                                <td>ARfD Unit			</td>
                                <td>Actual End Date				</td>
                                <td>Edit		</td>
                                <td>Delete		</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form2Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.CAS_Number}</td>
                                            <td>{data?.Exposure_Scenario}</td>
                                            <td>{data?.Exposure_Scenario_Subtype}</td>
                                            <td>{data?.Study}</td>
                                            <td>{data?.Point_of_Departure_and_End_Point}</td>
                                            <td>{data?.CAF_or_Target_MOE}</td>
                                            <td>{data?.Reference_Document}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.ARfD_Value}</td>
                                            <td>{data?.ARfD_Unit}</td>
                                            <td>{data?.Actual_End_Date}</td>
                                            <td><Button className='form-button' onClick={() => { setForm2(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm2Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">2.2x - PCPA factor</p>
                <Button className='form-button mb-3' onClick={() => { setForm22(true); setFormProp({}) }}>Add New Record</Button>
                <Form22 open={form22} setOpen={setForm22} data={formProp} getFormData={getForm22Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <td>PCPA Factor Characterized			</td>
                                <td>Date			</td>
                                <td>Name of Reference Document				</td>
                                <td>Reference Document Table of Content Reference				</td>
                                <td>PMRA Number	</td>
                                <td>Comments				</td>
                                <td>Edit				</td>
                                <td>Delete				</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form22Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.PCPA_Factor_Characterized}</td>
                                            <td>{data?.Date}</td>
                                            <td>{data?.Name_of_Reference_Document}</td>
                                            <td>{data?.Reference_Document_Table_of_Content_Reference}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm22(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm22Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">2.3x - Other Uncertainty Factors</p>
                <Button className='form-button mb-3' onClick={() => { setForm23(true); setFormProp({}) }}>Add New Record</Button>
                <Form23 open={form23} setOpen={setForm23} data={formProp} getFormData={getForm23Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>Date</td>
                                <td>Name of Reference Document	</td>
                                <td>Reference Document Table of Content Reference	</td>
                                <td>PMRA Number	</td>
                                <td>Comments</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form23Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Name_of_Reference_Document}</td>
                                            <td>{data?.Reference_Document_Table_of_Content_Reference}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm23(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm23Data(data.row_id)}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">2.4x - Toxicology Database</p>
                <Button className='form-button mb-3' onClick={() => { setForm24(true); setFormProp({}) }}>Add New Record</Button>
                <Form24 open={form24} setOpen={setForm24} data={formProp} getFormData={getForm24Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td style={{ width: 'auto' }}>Date	</td>
                                <td>Name of Reference Document	</td>
                                <td>Reference Document Table of Content Reference	</td>
                                <td>PMRA Number	</td>
                                <td>Comments</td>
                                <td>Reference TOX Review							</td>
                                <td>Database Completion Comments					</td>
                                <td>Tier 1 Studies Comment							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form24Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Name_of_Reference_Document}</td>
                                            <td>{data?.Reference_Document_Table_of_Content_Reference}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td>{data?.Reference_TOX_Review}</td>
                                            <td>{data?.Database_Completion_Comments}</td>
                                            <td>{data?.Tier_1_Studies_Comment}</td>
                                            <td><Button className='form-button' onClick={() => { setForm24(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm24Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">3x - Cumulative Risk Assessment</p>
                <Button className='form-button mb-3' onClick={() => { setForm3(true); setFormProp({}) }}>Add New Record</Button>
                <Form3 open={form3} setOpen={setForm3} data={formProp} getFormData={getForm3Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Cumulative Risk Assessment Required Flag		</td>
                                <td>Cumulative Risk Assessment Status					</td>
                                <td>Date					</td>
                                <td>PMRA Number						</td>
                                <td>Comments						</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form3Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Cumulative_Risk_Assessment_Required_Flag}</td>
                                            <td>{data?.Cumulative_Risk_Assessment_Status}</td>
                                            <td>{moment(data?.Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm3(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm3Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '15px' }} className="mb-3">4 - Reference Dose</p>
                <Button className='form-button mb-3' onClick={() => { setForm4(true); setFormProp({}) }}>Add New Record</Button>
                <Form4 open={form4} setOpen={setForm4} data={formProp} getFormData={getForm4Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Date		</td>
                                <td>PMRA Number						</td>
                                <td>Comments					</td>
                                <td>Reference Dose Submission Number							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form4Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{moment(data?.Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td>{(data?.Reference_Dose_Submission_Number)}</td>
                                            <td><Button className='form-button' onClick={() => { setForm4(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm4Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">5. Metabolites</p>
                <Button className='form-button mb-3' onClick={() => { setForm5(true); setFormProp({}) }}>Add New Record</Button>
                <Form5 open={form5} setOpen={setForm5} data={formProp} getFormData={getForm5Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Category			</td>
                                <td>PMRA Number of the Record of Residue Definition Decision							</td>
                                <td>List of Metabolites							</td>
                                <td>PMRA Number							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form5Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Category}</td>
                                            <td>{data?.PMRA_Number_of_the_Record_of_Residue_Definition_Decision}</td>
                                            <td>{data?.List_of_Metabolites}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td><Button className='form-button' onClick={() => { setForm5(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm5Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">6. Impurities</p>
                <Button className='form-button mb-3' onClick={() => { setForm6(true); setFormProp({}) }}>Add New Record</Button>
                <Form6 open={form6} setOpen={setForm6} data={formProp} getFormData={getForm6Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Impurity-Contaminant Name			</td>
                                <td>Use-Site-Categories								</td>
                                <td>Acceptable Level								</td>
                                <td>PMRA Number							</td>
                                <td>Name of Reference Document								</td>
                                <td>Comments							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form6Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Impurity_Contaminant_Name}</td>
                                            <td>{data?.Use_Site_Categories}</td>
                                            <td>{data?.Acceptable_Level}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Name_of_Reference_Document}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm6(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm6Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">7. Label Comments</p>
                <Button className='form-button mb-3' onClick={() => { setForm7(true); setFormProp({}) }}>Add New Record</Button>
                <Form7 open={form7} setOpen={setForm7} data={formProp} getFormData={getForm7Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Subsection Number				</td>
                                <td>Document Type									</td>
                                <td>Date								</td>
                                <td>PMRA Number							</td>
                                <td>Registration Number									</td>
                                <td>Comments							</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form7Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Subsection_Number}</td>
                                            <td>{data?.Document_Type}</td>
                                            <td>{moment(data?.Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Registration_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm7(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm7Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">8. Special Notes</p>
                <Button className='form-button mb-3' onClick={() => { setForm8(true); setFormProp({}) }}>Add New Record</Button>
                <Form8 open={form8} setOpen={setForm8} data={formProp} getFormData={getForm8Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Evaluator				</td>
                                <td>Date							</td>
                                <td>Comments							</td>
                                <td>Reference PMRA Document Number								</td>
                                <td>PMRA Number									</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form8Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Evaluator}</td>
                                            <td>{moment(data?.Date)?.format('DD-MM-YYYY')}</td>
                                            <td>{data?.Comments}</td>
                                            <td>{data?.Reference_PMRA_Document_Number}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td><Button className='form-button' onClick={() => { setForm8(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm8Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">9. New Data/ Scientific Issues</p>
                <Button className='form-button mb-3' onClick={() => { setForm9(true); setFormProp({}) }}>Add New Record</Button>
                <Form9 open={form9} setOpen={setForm9} data={formProp} getFormData={getForm9Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Subsection Name					</td>
                                <td>Study Type								</td>
                                <td>Document Type								</td>
                                <td>PMRA Number									</td>
                                <td>Document Reference										</td>
                                <td>Comments										</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form9Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Subsection_Name}</td>
                                            <td>{data?.Study_Type}</td>
                                            <td>{data?.Document_Type}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Document_Reference}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm9(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm9Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">10. Assessments conducted by other international organizations
                </p>
                <Button className='form-button mb-3' onClick={() => { setForm10(true); setFormProp({}) }}>Add New Record</Button>
                <Form10 open={form10} setOpen={setForm10} data={formProp} getFormData={getForm10Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>International Organization						</td>
                                <td>Document Title									</td>
                                <td>PMRA Number									</td>
                                <td>Date of Publication											</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form10Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.International_Organization}</td>
                                            <td>{data?.Document_Title}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{moment(data?.Date_of_Publication).format('DD-MM-YYYY')}</td>
                                            <td><Button className='form-button' onClick={() => { setForm10(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm10Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='box mt-3'>
                <p style={{ fontSize: '18px' }} className="mb-3">11. Public literature
                </p>
                <Button className='form-button mb-3' onClick={() => { setForm11(true); setFormProp({}) }}>Add New Record</Button>
                <Form11 open={form11} setOpen={setForm11} data={formProp} getFormData={getForm11Data} />
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped ">
                        <thead>
                            <tr>
                                <td>Search Conducted By							</td>
                                <td>Evaluator									</td>
                                <td>Search Conducted Date										</td>
                                <td>Search String												</td>
                                <td>PMRA Number													</td>
                                <td>Comments												</td>
                                <td>Edit						</td>
                                <td>Delete						</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                form11Data?.map(data => {
                                    return (
                                        <tr>
                                            <td>{data?.Search_Conducted_By}</td>
                                            <td>{data?.Evaluator}</td>
                                            <td>{moment(data?.Search_Conducted_Date).format('DD-MM-YYYY')}</td>
                                            <td>{data?.Search_String}</td>
                                            <td>{data?.PMRA_Number}</td>
                                            <td>{data?.Comments}</td>
                                            <td><Button className='form-button' onClick={() => { setForm11(true); setFormProp(data) }}>Edit</Button></td>
                                            <td><Button className='form-button' onClick={() => deleteForm11Data(data.row_id)}>Delete</Button></td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <CommentBox comments={comments} setComments={setComments} approvalBody={approvalBody} />
        </div>
    )
}

export default ToxFormDetails