import React, { useState, useEffect } from 'react';
import { Modal, Box, Button } from '@mui/material';
import { Slide } from '@mui/material';
import { useUpdateProfile, useUpdateReturnPolicy } from '../../../../api/useDataController';
import { toast } from "react-toastify";

const EditModal = ({ open, handleClose, title, type, initialData }) => {
    const [formData, setFormData] = useState({});
    const updateProfile = useUpdateProfile();
    const updateReturnPolicy = useUpdateReturnPolicy();

    useEffect(() => {
        setFormData(type === 'bank' ? initialData.displayData : initialData || '');
    }, [initialData, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'bank') {
            const payload = {
                bankId: initialData._id,
                bank: formData['Bank Name'],
                accountHolderName: formData['Account Holder'],
                accountNumber: formData['Account Number'],
                ifsc: formData['IFSC'],
                iban: formData['IBAN']
            };
            updateProfile.mutate(payload, {
                onSuccess: () => {
                    toast.success('Bank details updated successfully');
                    handleClose();
                },
                onError: (error) => {
                    toast.error(error.message || 'Failed to update bank details');
                }
            });
        } else {
            if (!formData || formData.trim() === '') {
                toast.error('Return policy cannot be empty');
                return;
            }

            updateReturnPolicy.mutate({ returnPolicy: formData }, {
                onSuccess: () => {
                    toast.success('Return policy updated successfully');
                    handleClose();
                },
                onError: (error) => {
                    toast.error(error.message || 'Failed to update return policy');
                }
            });
        }
    };

    const renderBankForm = () => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[14px] mb-2 block">Bank Name</label>
                    <input
                        name="Bank Name"
                        value={formData['Bank Name'] || ''}
                        onChange={handleChange}
                        className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-[14px] mb-2 block">Account Holder</label>
                    <input
                        name="Account Holder"
                        value={formData['Account Holder'] || ''}
                        onChange={handleChange}
                        className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[14px] mb-2 block">Account Number</label>
                    <input
                        name="Account Number"
                        value={formData['Account Number'] || ''}
                        onChange={handleChange}
                        className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                    />
                </div>
                <div>
                    <label className="text-[14px] mb-1 block">IFSC</label>
                    <input
                        name="IFSC"
                        value={formData['IFSC'] || ''}
                        onChange={handleChange}
                        className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="text-[14px] mb-1 block">IBAN</label>
                <input
                    name="IBAN"
                    value={formData['IBAN'] || ''}
                    onChange={handleChange}
                    className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                />
            </div>

            <div className="flex justify-center mt-4">
                <Button
                    variant="contained"
                    type="submit"
                    className="w-3/4 text-[14px]"
                    sx={{
                        backgroundColor: '#2F4EFF',
                        '&:hover': {
                            backgroundColor: '#2F4EFF'
                        },
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        padding: '10px 20px'
                    }}
                >
                    Save Changes
                </Button>
            </div>
        </form>
    );

    const renderReturnForm = () => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="text-[14px] mb-2 block">Return Policy</label>
                <textarea
                    value={formData}
                    onChange={(e) => setFormData(e.target.value)}
                    placeholder="Enter your return policy details"
                    rows={4}
                    className="w-full text-[14px] px-4 py-3 text-[#1B1B1B] opacity-80 bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl focus:outline-none"
                />
            </div>

            <Button
                variant="contained"
                type="submit"
                fullWidth
                className='text-[14px]'
                sx={{
                    backgroundColor: '#2F4EFF',
                    '&:hover': {
                        backgroundColor: '#2F4EFF'
                    },
                    fontSize: '14px',
                    textTransform: 'capitalize',
                    padding: '10px 20px'
                }}
            >
                Save Changes
            </Button>
        </form>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            className="flex items-center justify-center"
        >
            <Slide direction="up" in={open} timeout={700}>
                <Box
                    className={`bg-white rounded-lg shadow-xl outline-none ${type === 'return' ? 'w-[80%] max-w-sm' : 'w-[95%] max-w-xl'}`}
                >
                    <div className="border-b border-gray-200">
                        <h2 className="text-[16px] font-medium text-center p-6">{title}</h2>
                    </div>
                    <div className="p-6">
                        {type === 'bank' ? renderBankForm() : renderReturnForm()}
                    </div>
                </Box>
            </Slide>
        </Modal>
    );
};

export default EditModal;
