import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../api';
import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

export default function Home() {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = React.useState('')

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const getAllCategories = async () => {
        await api.getAllCategories().then(response => {
            setCategories(response.data.categories)
            setIsLoading(false);
        })
    }

    const history = useHistory();
    
    function RedirectToArticlesList() {
        let query = '?'
        if (checked) {
            query += 'content=yes'
        }
        if (selectedCategory !== '') {
            if (checked) query += `&filter=${selectedCategory}`
            else query += `filter=${selectedCategory}`
        }

        history.push({
            pathname: "/articles/list",
            query: query
        })
    }

    useEffect(() => {
       getAllCategories()
    }, []);

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label="Content"
            />

            <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-helper-label">Select Category</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {categories.map( (category, i) => {
                    return(
                        <MenuItem key={i} value={category._id}>{category.name}</MenuItem>
                    )})
                }
                </Select>
                <FormHelperText>Select articles from a specific category</FormHelperText>
            </FormControl>

            <Button variant="contained" color="primary" onClick={RedirectToArticlesList}>Get Articles</Button>

        </div>
    );
}
