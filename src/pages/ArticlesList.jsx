import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import api from '../api';
import { Button } from '@material-ui/core';

class UpdateArticle extends Component {
    update = event => {
        event.preventDefault()
        console.log(`param = ${this.props.param}`)
        window.location.href = `/articles/update/${this.props.param}`
    }

    render() {
        return <Button variant="contained" color="primary" onClick={this.update}>Update</Button>
    }
}

class DeleteArticle extends Component {
    delete = async (event) => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the article '${this.props.title}' permanently?`,
            )
        ) {
            await api.deleteArticleById_or_Title(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Button variant="contained" color="secondary" onClick={this.delete}>Delete</Button>
    }
}

class ArticlesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            columns: [],
            isLoading: false,
            page: 0,
            rowsPerPage: 10,
            query: props.location.query || ''
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllArticles(this.state.query).then(response => {
            this.setState({
                articles: response.data.articles,
                isLoading: false,
            })
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page : newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage : +event.target.value });
        this.setState({ page : 0 });
    };
    
    render() {
        const { articles, isLoading, page, rowsPerPage } = this.state
        const useStyles = makeStyles({
            root: {
              width: '100%',
            },
            container: {
              maxHeight: 440,
            },
          });

          const columns = [
            { id: 'title', label: 'Title', minWidth: 100 },
            { id: 'content', label: 'Content', minWidth: 200 },
            { id: 'description', label: 'Description', minWidth: 200 },
            { id: 'category', label: 'Category', minWidth: 100 },
            { id: 'update', label: 'Update', minWidth: 100 },
            { id: 'delete', label: 'Delete', minWidth: 100 }
          ];

        return (
            <Paper className={useStyles.root}>
            <TableContainer className={useStyles.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column, i) => (
                        <TableCell
                        key={i}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                            switch (column.id) {
                                case 'update':
                                    return (
                                        <TableCell key={column.id}>
                                            <UpdateArticle param={row._id} />
                                        </TableCell>
                                    );
                                case 'delete':
                                    return (
                                        <TableCell key={column.id}>
                                            <DeleteArticle id={row._id} title={row.title}  />
                                        </TableCell>
                                    );
                                case 'category':
                                    return (
                                        <TableCell key={column.id}>
                                        {row.category.name}
                                    </TableCell>
                                    );
                                default:
                                    return (
                                        <TableCell key={column.id}>
                                            {row[column.id]}
                                        </TableCell>
                                    );
                            }
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={articles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            </Paper>
        );
    }   
}

export default ArticlesList