import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Link,
  Button
} from "@mui/material";

const SiteInfoDialog = ({ open, setOpen, imageObject, quoteObject }) => {
  const handleCloseDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        <Typography variant="h3">Info and Credit</Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5">Image</Typography>
        <Typography>
          {"Image provided by "}
          <Link underline="hover" href="https://data.nasa.gov/Space-Science/Astronomy-Picture-of-the-Day-API/ez2w-t8ua">
            NASA's Astronomy Picture of the Day API
          </Link>
          {"."}
        </Typography>
        <Typography><strong>Image Title:</strong> {imageObject.title}</Typography>
        <Typography><strong>Photographer:</strong> {imageObject.photographer}</Typography>
        <Typography><strong>Description:</strong> {imageObject.description}</Typography>
        <br/>
        <Typography variant="h5">Quote</Typography>
        <Typography><strong>Author:</strong> {quoteObject.author}</Typography>
        <br/>
        <Typography variant="h5">Developer</Typography>
        <Typography>
          {"This site was developed by Daniel Di Giovanni. Email: "}
          <Link underline="hover" href="mailto:dannyjdigio@gmail.com">dannyjdigio@gmail.com</Link>
          {". My GitHub can be found "}
          <Link underline="hover" href="https://github.com/Danpythonman">here.</Link>
        </Typography>
        <Typography>
          {"Frontend made with "}
          <Link underline="hover" href="https://reactjs.org/">React</Link>
          {" and "}
          <Link underline="hover" href="https://mui.com/">MUI</Link>
          {". See the frontend code "}
          <Link underline="hover" href="https://github.com/Danpythonman/inspiration_v2_frontend">here.</Link>
        </Typography>
        <Typography>
          {"Backend made with "}
          <Link underline="hover" href="https://nodejs.org/en/">NodeJs</Link>
          {" using "}
          <Link underline="hover" href="https://expressjs.com/">ExpressJs</Link>
          {" framework and "}
          <Link underline="hover" href="https://www.mongodb.com/">MongoDB</Link>
          {" database with "}
          <Link underline="hover" href="https://nodemailer.com/about/">Nodemailer</Link>
          {" for sending emails. Also using "}
          <Link underline="hover" href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</Link>
          {" and "}
          <Link underline="hover" href="https://www.npmjs.com/package/node-fetch">node-fetch</Link>
          {". See the backend code "}
          <Link underline="hover" href="https://github.com/Danpythonman/inspiration_v2_backend">here.</Link>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SiteInfoDialog;
