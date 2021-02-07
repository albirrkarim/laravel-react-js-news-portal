import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({item,setNewsId}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea

        onClick={()=>{
            setNewsId(item.news_id)
          }}

      >
        <CardMedia
          className={classes.media}
          image={location.origin+"/storage/images_thumbnail/"+item.file}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" >
            {item.name}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}