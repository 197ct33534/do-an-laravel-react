import { Rating } from '@mui/material';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import TextareaMui from '../../components/Form/TextareaMui';
import { useForm } from 'react-hook-form';
import { fetchpostComment } from '../../features/shopApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { memo } from 'react';

const FormReview = () => {
    const { id } = useParams();

    const [value, setValue] = React.useState(5);
    const [hover, setHover] = React.useState(-1);
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            content_review: 'Chất liệu:\nMàu sắc:\nĐúng với mô tả: \nĐánh giá của bạn:\n',
        },
    });
    const onSubmit = async (data) => {
        const data_send = { star: value, content_review: data.content_review, product_id: id };

        const response = await fetchpostComment(data_send);

        if (response.data.success) {
            toast.success(response.data.message);
            reset();
        } else {
            toast.warning(response.data.message);
        }
    };
    return (
        <>
            <h4 className="mb-4">Để lại đánh giá</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex my-3 align-items-center">
                    <p className="mb-0 mr-2">Tặng sao * :</p>
                    <div className="text-primary">
                        <Rating
                            size="large"
                            value={value}
                            precision={1}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label for="content_review">Đánh giá *:</label>
                    <TextareaMui
                        id="content_review"
                        name="content_review"
                        control={control}
                        placeholder="viết bài đánh giá"
                    />
                </div>

                <div className="form-group mb-0" style={{ textAlign: 'right' }}>
                    <input type="submit" value="Gửi đánh giá" className="btn btn-primary px-3" />
                </div>
            </form>
        </>
    );
};

export default memo(FormReview);
