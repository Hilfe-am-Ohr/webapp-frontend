import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import clsx from "clsx";

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import {scroller} from 'react-scroll'
import Paper from "@material-ui/core/Paper";

import {IndexPageTranslation} from '../../Translations/Pages/IndexPageTranslation';
import {Container} from "@material-ui/core";
import {Breakpoint} from "react-socks";
import DrawingCollab from "./images/Drawing_Collab_1200px.png";
import {useStyles} from './style';

let cloneDeep = require('lodash.clonedeep');


const CollabChecklist = (props) => {

    const classes = useStyles();

    let [hotlineState, setHotlineState] = useState({0: false, 1: false, 2: false});
    let [forumState, setForumState] = useState({0: false, 1: false, 2: false});

    let [collab, setCollab] = useState({visible: false});

    function toggleHotline(checkboxNo) {
        let newHotlineState = cloneDeep(hotlineState);
        newHotlineState[checkboxNo] = !hotlineState[checkboxNo];
        setHotlineState(newHotlineState);
        evalChecklist(newHotlineState, forumState);
    }

    function toggleForum(checkboxNo) {
        let newForumState = cloneDeep(forumState);
        newForumState[checkboxNo] = !forumState[checkboxNo];
        setForumState(newForumState);
        evalChecklist(hotlineState, newForumState);
    }

    const checkboxComponent = (column, checkboxNo) => {
        let toggle;

        if (column === 0) {
            toggle = () => toggleHotline(checkboxNo);
        } else {
            toggle = () => toggleForum(checkboxNo);
        }

        if ((column === 0 && hotlineState[checkboxNo]) || (column === 1 && forumState[checkboxNo])) {
            return <CheckBoxIcon className={classes.collaborateCheckbox} onClick={toggle}/>
        } else {
            return <CheckBoxOutlineBlankIcon className={classes.collaborateCheckbox} onClick={toggle}/>
        }
    };


    function scrollToBottomHotline() {
        scroller.scrollTo('ExpansionPanelHotline', {
            duration: 300,
            delay: 0,
            smooth: true,
            offset: 100, // Scrolls to element + 50 pixels down the page
        })
    }

    function scrollToBottomForum() {
        scroller.scrollTo('ExpansionPanelForum', {
            duration: 300,
            delay: 0,
            smooth: true,
            offset: 100, // Scrolls to element + 50 pixels down the page
        })
    }

    function evalChecklist(hotlineState, forumState) {
        if ((hotlineState[0] && hotlineState[1] && hotlineState[2]) || (forumState[0] && forumState[1] && forumState[2])) {
            setCollab({visible: true});
            scroller.scrollTo('CollabBox', {
                duration: 300,
                delay: 0,
                smooth: true,
                offset: 100, // Scrolls to element + 50 pixels down the page
            })
        } else {
            setCollab({visible: false});
        }
    }


    /* eslint-disable */
    /* disabled warnigns because of expandables */

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={6}>
                <ExpansionPanel elevation={2} id="ExpansionPanelHotline">
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={scrollToBottomHotline}/>}>
                        <Typography variant="h5">
                            {IndexPageTranslation.collab2[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.collaborateDetails}>
                        <Typography variant="h6" className={clsx(classes.margin1)}>
                            {IndexPageTranslation.collab3[props.language]}
                        </Typography>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(0, 0)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab4[props.language]}
                            </Typography>
                        </div>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(0, 1)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab5[props.language]}
                            </Typography>
                        </div>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(0, 2)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab6[props.language]}
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
            <Grid item xs={12} md={6}>
                <ExpansionPanel elevation={2} id="ExpansionPanelForum">
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon onClick={scrollToBottomForum}/>}>
                        <Typography variant="h5">
                            {IndexPageTranslation.collab7[props.language]}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.collaborateDetails}>
                        <Typography variant="h6" className={clsx(classes.margin1)}>
                            {IndexPageTranslation.collab3[props.language]}
                        </Typography>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(1, 0)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab8[props.language]}
                            </Typography>
                        </div>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(1, 1)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab9[props.language]}
                            </Typography>
                        </div>
                        <div className={clsx(classes.margin1, classes.collaborateCheckboxLine)}>
                            {checkboxComponent(1, 2)}
                            <Typography variant="subtitle1">
                                {IndexPageTranslation.collab10[props.language]}
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
            <Grid item xs={12} id="CollabBox" className={clsx("CollabBox", collab.visible ? "CollabBoxVisible" : "CollabBoxInvisible")}>
                <Paper elevation={2} className={clsx(classes.collabPaper)}>
                    <Typography variant="h6">
                        {IndexPageTranslation.collab11[props.language]} <a className={classes.pinkLink}
                        href="mailto:collab@helperline.io"><strong>collab@helperline.io</strong></a>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};


export const CollabPanel = (props) => {

    const classes = useStyles();

    return (
        <Container maxWidth="md">

            <Typography variant="h5" className={clsx(classes.centerText, classes.margin3)}>
                <strong>{IndexPageTranslation.collab1[props.language]}</strong>
            </Typography>

            <Breakpoint small down>
                <div className={clsx(classes.centerBox, classes.connectImageBoxMobile, classes.margin5)}>
                    <img alt="Collaborate Drawing" src={DrawingCollab} className={classes.connectImage}/>
                </div>
            </Breakpoint>
            <Breakpoint medium up>
                <div className={clsx(classes.centerBox, classes.connectImageBox, classes.margin5)}>
                    <img alt="Collaborate Drawing" src={DrawingCollab} className={classes.connectImage}/>
                </div>
            </Breakpoint>

            <CollabChecklist language={props.language}/>

        </Container>
    );
};
