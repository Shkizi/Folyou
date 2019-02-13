import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CardContent } from '@material-ui/core';

const styles = {
    card: {
        maxWidth: 300,
        marginTop: 20,
        marginLeft: 20
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

let n = 10;

function createElements(n){
    return [...Array(n)].map(() => <div>
    <Card  className={styles.card}>
        <CardContent  className={styles.card}>
        <Button>
            Botão
        </Button>   
        </CardContent> 
    </Card>
</div>
)}


function Cards() {

    return (
        <div>
        {createElements(n)}
    </div>
    );
}

export default withStyles(styles)(Cards);
