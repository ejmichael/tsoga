import React, { useEffect, useState } from 'react'
import axios from 'axios';

const LeadForm = () => {

    const [selectedInsuranceType, setSelectedInsuranceType] = useState(null)
    const [subTypes, setSubTypes] = useState([]);
    const domain = window.location.href.includes('localhost') ? "http://localhost:5000" : "https://tsoga-backend.onrender.com";

    const subTypeOptions = {
        credit: {
          trade_credit: 'Trade Credit',
          credit_insurance: 'Credit Insurance'
        },
        guarantees: {
          fuel: 'Fuel',
          performance: 'Performance',
          construction: 'Construction',
          mining_rehabilitation: 'Mining Rehabilitation'
        },
        aviation: {
          hull_insurance: 'Hull Insurance',
          passenger_liability: 'Passenger Liability',
          personal_accident: 'Personal Accident',
          public_liability: 'Public Liability'
        },
        marine: {
          marine_cargo: 'Marine Cargo',
          marine_hull: 'Marine Hull / Watercraft',
          stock_throughput: 'Stock Throughput',
          watercraft: 'Watercraft'
        },
        'accident-health': {
          group_personal_accident: 'Group Personal Accident',
          business_travel: 'Business Travel',
          leisure_travel: 'Leisure Travel'
        },
        'engineering-risks': {
          specialised_electronic_equipment: 'Specialised Electronic Equipment',
          contractors_all_risks: 'Contractors All Risks',
          contractors_plant: 'Contractors Plant and Equipment/Plant',
          machinery_breakdown: 'Machinery Breakdown'
        },
        'specialist-liability': {
          broadform_liability: 'Broadform Liability',
          commercial_crime: 'Commercial Crime',
          cyber_liability: 'Cyber Liability',
          directors_officers: 'Directors and Officers Liability',
          employment_practices: 'Employment Practices Liability',
          environmental_impairment: 'Environmental Impairment Liability',
          professional_indemnity: 'Professional Indemnity',
          medical_malpractice: 'Medical Malpractice',
          kidnap_ransom: 'Kidnap and Ransom/Extortion'
        },
        commercial: {
          accidental_damage: 'Accidental Damage',
          buildings_combined: 'Buildings Combined',
          business_all_risks: 'Business All Risks',
          business_interruption: 'Business Interruption',
          electronic_equipment: 'Electronic Equipment',
          fidelity_guarantee: 'Fidelity Guarantee',
          fire: 'Fire',
          glass: 'Glass',
          machinery_breakdown: 'Machinery Breakdown',
          money: 'Money',
          office_contents: 'Office Contents',
          theft: 'Theft',
          motor: 'Motor'
        }
      };
      
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
            formData.lastName=== '' ||
            formData.emailAddress=== '' ||
            formData.phoneNumber=== '' ||
            formData.location=== '' ||
            formData.insuranceType=== '' ||
            formData.insuranceSubType=== '' 
        ) {
            alert("Please complete all fields")
        }

        try {
            const res = await axios.post(`${domain}/api/lead/${formData.insuranceType}`, formData)
            if(res.data.message === 'Lead captured and PDF emailed successfully.'){
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
                setSubTypes({});
            }
        }

        handleInsuranceTypeSelection()
    }, [selectedInsuranceType])

    const handleFormChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

console.log(formData);

  return (
    <div className='min-h-screen bg-[#F4BA00] py-8'>
        <div className='md:max-w-[75%] max-w-[85%] border mx-auto p-8 bg-white rounded-md'>
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
                                onChange={handleFormChange}
                                value={formData.firstName}
                                placeholder='Enter your first name here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Surname</label>
                            <input
                                type='text'
                                name="lastName"
                                onChange={handleFormChange}
                                value={formData.lastName}
                                placeholder='Enter your surname here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Phone Number</label>
                            <input
                                type='text'
                                name="phoneNumber"
                                onChange={handleFormChange}
                                value={formData.phoneNumber}
                                placeholder='Enter your phone number here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Email Address (optional)</label>
                            <input
                                type='email'
                                name="emailAddress"
                                onChange={handleFormChange}
                                value={formData.emailAddress}
                                placeholder='Enter your email address here'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Province</label>
                            <input
                                type='text'
                                name="location"
                                onChange={handleFormChange}
                                value={formData.location}
                                placeholder='Province'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div>
                        {/* <div className='grid grid-cols-1 gap-2'>
                            <label>Area</label>
                            <input
                                type='text'
                                name="location"
                                placeholder='Province'
                                className='h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs'    
                            />
                        </div> */}
                    </div>
                </div>
                <div className='space-y-4 pt-6'>
                    <p className='text-lg font-medium'>Insurance Info</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='grid grid-cols-1 gap-2'>
                            <label>Insurance Type</label>
                            <select 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSelectedInsuranceType(value);
                                    setFormData((prev) => ({ ...prev, insuranceType: value, insuranceSubType: '' }));
                                  }}
                                className=' text-base rounded-md border h-9 px-2 py-1 text-base shadow-xs'>
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
                            <label>Insurance Sub Type</label>
                            <select onChange={(e) =>
                                setFormData((prev) => ({ ...prev, insuranceSubType: e.target.value }))
                                }
                                value={formData.insuranceSubType}
                                className=' rounded-md border h-9 px-2 py-1 text-base shadow-xs'>
                            <option value="">Select Sub Type</option>
                                {Object.entries(subTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
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
                    Thank you! Look out for our email!
                </div>
            )}
        </div>
    </div>
  )
}

export default LeadForm