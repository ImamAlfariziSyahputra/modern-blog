import { Typography } from '@mui/material';
import MUIBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <MUIBreadcrumbs aria-label="breadcrumb" className="pl-4">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          className="!text-blue-500"
        >
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
          className="!text-blue-500"
        >
          Post
        </Link>
        <Typography className="!text-primary">Add</Typography>
      </MUIBreadcrumbs>
    </div>
  );
}
