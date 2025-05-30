import React, { useEffect, useState } from 'react'
import axios from 'axios';

const LeadForm = () => {

    const [selectedInsuranceType, setSelectedInsuranceType] = useState(null)
    const [subTypes, setSubTypes] = useState([]);
    const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://taptosee-backend.onrender.com";

    const subTypeOptions = {
        'credit': [
          'Trade Credit',
          'Credit Insurance'
        ],
        'guarantees': [
          'Fuel',
          'Performance',
          'Construction',
          'Mining Rehabilitation'
        ],
        'aviation': [
          'Hull Insurance',
          'Passenger Liability',
          'Personal Accident',
          'Public Liability'
        ],
        'marine': [
          'Marine Cargo',
          'Marine Hull / Watercraft',
          'Stock Throughput',
          'Watercraft'
        ],
        'accident-health': [
          'Group Personal Accident',
          'Business Travel',
          'Leisure Travel'
        ],
        'engineering-risks': [
          'Specialised Electronic Equipment',
          'Contractors All Risks',
          'Contractors Plant and Equipment/Plant',
          'Machinery Breakdown'
        ],
        'specialist-liability': [
          'Broadform Liability',
          'Commercial Crime',
          'Cyber Liability',
          'Directors and Officers Liability',
          'Employment Practices Liability',
          'Environmental Impairment Liability',
          'Professional Indemnity',
          'Medical Malpractice',
          'Kidnap and Ransom/Extortion'
        ],
        'commercial': [
          'Accidental Damage',
          'Buildings Combined',
          'Business All Risks',
          'Business Interruption',
          'Electronic Equipment',
          'Fidelity Guarantee',
          'Fire',
          'Glass',
          'Machinery Breakdown',
          'Money',
          'Office Contents',
          'Theft',
          'Motor'
        ]
      };

      const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        emailAddress: '',
        phoneNumber: '',
        location: '',
        insuranceType: '',
        insuranceSubType: ''
      })

      const [leadSubmitted, setLeadSubmitted] = useState(false)

      const submitForm = async (e) => {
        e.preventDefault()
        if(
            formData.firstName=== '' ||
            formData.surname=== '' ||
            formData.emailAddress=== '' ||
            formData.phoneNumber=== '' ||
            formData.location=== '' ||
            formData.insuranceType=== '' ||
            formData.insuranceSubType=== '' 
        ) {
            alert("Please complete all fields")
        }

        try {
            const res = await axios.post(`${domain}/api/lead/${formData.insuranceType}/${formData.insuranceSubType}`, formData)
            if(res.data.message === 'Lead Submitted'){
                setLeadSubmitted(true)
            }
        } catch (error) {
            console.log(error.message);   
        }
      }
      

    useEffect(() => {
        const handleInsuranceTypeSelection = () => {
            if(selectedInsuranceType && subTypeOptions[selectedInsuranceType]){
                setSubTypes(subTypeOptions[selectedInsuranceType])
            } else {
                setSubTypes([]);
            }
        }

        handleInsuranceTypeSelection()
    }, [selectedInsuranceType])


  return (
    <div className='min-h-screen bg-[#F4BA00] py-8'>
        <div className='max-w-[75%] border mx-auto p-8 bg-white rounded-md'>
            <div className='mb-'>
                <p className='text-3xl text-[#0C0C0C] font-bold pb-2'>Join Tsoga Insure</p>
                <p className='text-sm text-[#753E31] pb-2'>Fill in your details below and we'll send you more information</p>
            </div>
            <div className="h-px bg-[#F4BA00]/30 my-6" />
            <form>
                <div className='space-y-4'>
                    <p className='text-lg font-medium'>Personal Info</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>First Name</label>
                            <input
                                type='text'
                                name="firstName"
                                placeholder='Enter your first name here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Surname</label>
                            <input
                                type='text'
                                name="surname"
                                placeholder='Enter your surname here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                name="phoneNumber"
                                placeholder='Enter your phone number here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Email Address (optional)</label>
                            <input
                                type='email'
                                name="emailAddress"
                                placeholder='Enter your email address here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Province</label>
                            <input
                                type='text'
                                name="location"
                                placeholder='Province'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Area</label>
                            <input
                                type='text'
                                name="location"
                                placeholder='Province'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                    </div>
                </div>
                <div className='space-y-4 pt-6'>
                    <p className='text-lg font-medium'>Insurance Info</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Insurace Type</label>
                            <select onChange={(e) => setSelectedInsuranceType(e.target.value)} className=' text-base rounded-md border h-9 px-2 py-1 text-base shadow-xs'>
                                <option value="">Insurance Type</option>
                                <option value="credit">Credit Insurance</option>
                                <option value="guarantees">Guarantees</option>
                                <option value="aviation">Aviation</option>
                                <option value="marine">Marine Insurance</option>
                                <option value="accident-health">Accident and Health</option>
                                <option value="engineering-risks">Engineering Risks</option>
                                <option value="specialist-liability">Specialist Liability</option>
                                <option value="commercial">Commercial / Corporate</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Insurace Sub Type</label>
                            <select className=' rounded-md border h-9 px-2 py-1 text-base shadow-xs'>
                            <option value="">Select Sub Type</option>
                                {subTypes.map((sub, index) => (
                                    <option key={index} value={sub}>{sub}</option>
                                ))}
                                
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div className="h-px bg-[#F4BA00]/30 mt-6" />

                <div className='w-full pt-6 flex md:justify-end justify-center'>
                    <button className='md:w-[30%] w-full text-white h-12 rounded-lg text-base gap-2  bg-[#753E31] hover:bg-[#753E31]/90 font-bold' onClick={submitForm}>
                        Proceed
                    </button>
                </div>
            </form>
            {leadSubmitted && (
                <div>
                    Thank you! Look out for our email.
                </div>
            )}
        </div>
    </div>
  )
}

export default LeadForm