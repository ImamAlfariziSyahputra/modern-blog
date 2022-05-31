export const getComments = async () => {
  return [
    {
      id: '1',
      body: 'First Comment',
      username: 'Ahok',
      pp: 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831856574.jpeg&w=1920&q=75',
      userId: '1',
      parentId: null,
      createdAt: '01-01-2022',
    },
    {
      id: '2',
      body: 'Second Comment',
      username: 'Jarot',
      pp: 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831856574.jpeg&w=1920&q=75',
      userId: '2',
      parentId: null,
      createdAt: '01-01-2022',
    },
    {
      id: '3',
      body: 'First Comment => First Child',
      username: 'Adeknya Ahok',
      pp: 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831770550.jpeg&w=1080&q=75',
      userId: '3',
      parentId: '1',
      createdAt: '01-01-2022',
    },
    {
      id: '4',
      body: 'Second Comment => Second Child',
      username: 'Adeknya Jarot',
      pp: 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A8080%2Fuploads%2Fposts%2FPost-1649831770550.jpeg&w=1080&q=75',
      userId: '4',
      parentId: '2',
      createdAt: '01-01-2022',
    },
  ];
};
