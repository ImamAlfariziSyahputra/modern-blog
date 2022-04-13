import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Typography, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputText from '@/components/forms/InputText';
import InputDropdown from '@/components/forms/InputDropdown';
import Image from 'next/image';
import useMounted from '@/components/useMounted';
import QuilljsEditor from '@/components/text-editor/QuilljsEditor';
import InputFile from '@/components/forms/InputFile';
import {
  getPost,
  getRunningOperationPromises,
  useUpdatePostMutation,
} from '@/redux/apis/postApi';
import { wrapper } from '@/redux/store/store';
import InputSlug from '@/components/forms/InputSlug';

// const defaultValues = {
//   title: '',
//   slug: '',
//   image: '',
//   content: '',
//   category: '',
//   status: '',
//   author: '1',
// };

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(200).required('Title is required.'),
  slug: Yup.string().required('Slug is required.'),
  image: Yup.mixed()
    // .test('required', 'Image is required', (value) => value.length > 0)
    .test('fileSize', 'File Size is too large', (value) => {
      // console.log('value.length => ', value.length);
      return value.length > 0 ? value[0]?.size <= 2000000 : true;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return value.length > 0
        ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type)
        : true;
    })
    .nullable(),
  content: Yup.string().required('Content is required.'),
  category: Yup.string().required('Category is required.'),
  status: Yup.string().required('Status is required.'),
});

export default function EditBlog({ postApi }) {
  const { data, isError, isSuccess } = postApi;
  //! "image" => for set Image Preview
  //! "id" => for Update Post
  const { image, id, ...post } = data;
  // console.log('post => ', post);

  const router = useRouter();
  const {
    query: { slug },
  } = useRouter();

  const methods = useForm({
    mode: 'all',
    defaultValues: useMemo(() => {
      //! Coba jangan setValue "image" dari api, bikin buat preview aja
      return post;
    }, [post]),
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [imagePreview, setImagePreview] = useState(image || '');
  const [updatePost] = useUpdatePostMutation();

  // const { data, loading, error } = usePostQuery(slug);
  // console.log('data => ', data);

  const onSubmit = async (data) => {
    console.log('data => ', data);
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', data.title);
      updatedPost.append('slug', data.slug);
      updatedPost.append('category', data.category);
      updatedPost.append('status', data.status);
      updatedPost.append('content', data.content);
      if (data.image.length > 0) {
        updatedPost.append('image', data.image[0]);
      }
      // updatedPost.append('image', '');
      updatedPost.append('author', 1);
      await updatePost({ data: updatedPost, slug }).unwrap();
      // reset();
      // setImagePreview('');
      router.push('/blog');
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const previewHandler = (e) => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      return;
    }

    //! if image removed, set image preview back
    if (image) {
      setImagePreview(image);
      return;
    }

    setImagePreview('');
  };

  // console.log('errors => ', errors);
  // console.log('imagePreview => ', imagePreview);

  const mounted = useMounted();

  useEffect(() => {
    if (isSuccess) {
      reset(post);
    }
  }, [isSuccess]);
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
            <InputSlug name="title" subName="slug" />
          </div>
          {/* Slug */}
          <div className="">
            <Typography>Slug</Typography>
            <InputText name="slug" disabled />
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
                  value: 'published',
                },
                {
                  label: 'Draft',
                  value: 'draft',
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const slug = ctx.params?.slug;
    if (typeof slug === 'string') {
      store.dispatch(getPost.initiate(slug));
    }

    let postApi = await Promise.all(getRunningOperationPromises());
    postApi = postApi[0];

    // console.log('post => ', post);

    return {
      props: {
        postApi,
      },
    };
  }
);
