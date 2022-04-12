import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputText from '@/components/forms/InputText';
import InputDropdown from '@/components/forms/InputDropdown';
import { useState } from 'react';
import Image from 'next/image';
import useMounted from '@/components/useMounted';
import QuilljsEditor from '@/components/text-editor/QuilljsEditor';
import InputFile from '@/components/forms/InputFile';
import { useAddPostMutation } from '@/redux/apis/postApi';

const defaultValues = {
  title: '',
  slug: '',
  image: '',
  content: '',
  category: '',
  status: '',
  author: '1',
};

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(200).required('Title is required.'),
  slug: Yup.string().required('Slug is required.'),
  image: Yup.mixed()
    .test('required', 'Image is required', (value) => value.length > 0)
    .test('fileSize', 'File Size is too large', (value) => {
      return value.length && value[0].size <= 2000000;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return (
        value.length &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
      );
    }),
  content: Yup.string().required('Content is required.'),
  category: Yup.string().required('Category is required.'),
  status: Yup.string().required('Status is required.'),
});

export default function AddBlog() {
  const router = useRouter();
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [imagePreview, setImagePreview] = useState('');

  const [addPost] = useAddPostMutation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const newPost = new FormData();
      newPost.append('title', data.title);
      newPost.append('slug', data.slug);
      newPost.append('category', data.category);
      newPost.append('status', data.status);
      newPost.append('content', data.content);
      newPost.append('image', data.image[0]);
      newPost.append('author', data.author);
      await addPost(newPost).unwrap();
      router.push('/blog');
      // reset();
      // setImagePreview('');
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const previewHandler = (e) => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      return;
    }

    setImagePreview('');
  };

  // console.log('errors => ', errors);
  // console.log('imagePreview => ', imagePreview);

  const mounted = useMounted();
  return (
    <>
      <FormProvider {...methods}>
        <div className="flex items-center space-x-3 mb-5">
          <Avatar
            alt="Profile Photo"
            src="https://mui.com/static/images/avatar/1.jpg"
          />
          <div className="">
            <h4 className="font-medium">Chad Alexander</h4>
            <p>March 30, 2022</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-7 gap-y-4 mb-5">
          {/* Title */}
          <div className="">
            <Typography>Title</Typography>
            <InputText name="title" />
          </div>
          {/* Slug */}
          <div className="">
            <Typography>Slug</Typography>
            <InputText name="slug" />
          </div>
          {/* Category */}
          <div className="">
            <Typography>Category</Typography>
            <InputText name="category" />
          </div>
          {/* Status */}
          <div className="">
            <Typography>Status</Typography>
            <InputDropdown
              name="status"
              options={[
                {
                  label: 'Published',
                  value: true,
                },
                {
                  label: 'Draft',
                  value: false,
                },
              ]}
            />
          </div>
          {/* Content */}
          <div className="col-span-2">
            <Typography>Content</Typography>
            {mounted ? <QuilljsEditor name="content" /> : <h1>Loading...</h1>}
          </div>
          {/* Image */}
          <div className="col-span-2 border p-4 rounded-md">
            <Typography className="!text-2xl !mb-2">Featured Image</Typography>
            <div className="flex items-center space-x-6 w-6/12">
              <div className="relative h-40 w-6/12">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Post Image"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                ) : (
                  <Image
                    src="/placeholder.png"
                    alt="Post Image"
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                  />
                )}
              </div>
              <div className="w-6/12">
                <InputFile name="image" previewHandler={previewHandler} />
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Button
            variant="outlined"
            size="large"
            color="warning"
            className="!mr-4"
            onClick={() => router.push('/blog')}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error"
            className="!mr-4"
            onClick={() => reset()}
          >
            Reset
          </Button>
          <LoadingButton
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </div>
      </FormProvider>
    </>
  );
}
