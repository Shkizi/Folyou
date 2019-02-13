import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        maxWidth: 300,
        marginTop: 20,
        marginLeft: 20,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',
    },
};

let n = 10;

function createElements(n){
    return [...Array(n)].map(() => <div>
    <Card>
        <Button>
            Botão
        </Button>    
    </Card>
</div>
)}


function Cards(props) {

    return (
        <div>
        {createElements(n)}
    </div>
    );
}

export default withStyles(styles)(Cards);
