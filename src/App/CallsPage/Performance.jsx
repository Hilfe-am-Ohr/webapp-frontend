import React from 'react';
import {connect} from 'react-redux';

import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CommunityDrawing from './images/Drawing_Performance_Community_800px.png';
import SelfDrawing from './images/Drawing_Performance_Self_800px.png';


import {CallsPageTranslation} from './CallsPageTranslation';


const useStyles = makeStyles(theme => ({
    title: {
        width: "100%",
        display: "block",
        textAlign: "center",
        marginBottom: theme.spacing(2),
    },
    performancePaper: {
        padding: theme.spacing(2),
    },
    performanceImageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        marginBottom: theme.spacing(2),
    },
    performanceImage: {
        maxHeight: "100%",
    },
    performanceRow: {
        textAlign: "center",
    },
    performanceNumber: {
        color: theme.palette.secondary.main,
    },
}));


function PerformanceComponent(props) {

    const classes = useStyles();

    const PerformanceRow = (props) => (
        <Grid item xs={12}>
            <Typography variant="h6" className={classes.performanceRow}>{props.text}:&nbsp;
                <span className={classes.performanceNumber}><strong>{props.value}</strong></span>
            </Typography>
        </Grid>
    );

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} className={classes.performanceImageContainer}>
                            <img src={CommunityDrawing} alt={CallsPageTranslation.performanceAlt1[props.language]}
                                 className={classes.performanceImage}/>
                        </Grid>
                        <PerformanceRow text={CallsPageTranslation.performanceKey1[props.language]}
                                        value={props.performance.area.volunteers}/>
                        <PerformanceRow text={CallsPageTranslation.performanceKey2[props.language]}
                                        value={props.performance.area.callers}/>
                        <PerformanceRow text={CallsPageTranslation.performanceKey3[props.language]}
                                        value={props.performance.area.calls}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} className={classes.performanceImageContainer}>
                            <img src={SelfDrawing} alt={CallsPageTranslation.performanceAlt2[props.language]}
                                 className={classes.performanceImage}/>
                        </Grid>
                        <PerformanceRow text={CallsPageTranslation.performanceKey4[props.language]}
                                        value={props.performance.account.registered}/>
                        <PerformanceRow text={CallsPageTranslation.performanceKey3[props.language]}
                                        value={props.performance.account.calls}/>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


/* Redux link -------------------------------------------------------------------- */
/* Making the RouterComponent watch the loggedIn property of the store */


const mapStateToProps = state => ({
    language: state.language,

    performance: state.performance,
});

const mapDispatchToProps = dispatch => ({
});

export const Performance = connect(mapStateToProps, mapDispatchToProps)(PerformanceComponent);


