import React, {useState} from 'react';
import {deletfoodAPI} from '../api/DayPlanAPI'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { flowRight } from 'lodash';
import SearchModal from './SearchModal';
import {useAppContext} from './context/AppContext';
import AlertModal from '../utils/AlertModal'
import Alert from '@material-ui/lab/Alert';




const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    table: {
        minWidth: 150,
        margin: 'auto',
        // maxWidth: 1000,
        // marginTop: 10,
        // marginLeft: 20,
        // marginBottom: 10,
        // marginRight: 20,
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: 100,
        },
      },
}));


const DrawFoodDiaryTableToDom = ({ mealDetailsB, mealDetailsL, mealDetailsD, mealDetailsS, getDayPlanAPI, setDayPlanResult }) => {
    

    const appContext = useAppContext();
    const {date, setDate, addMealSearchModal, setAddMealSearchModal, setReloadSameDateDayPlan} = appContext

    const [showModal, setShowModal] = useState(false);
    const [deletAlert, setDeleteAlert] = useState(false);
    

    const calTotalCalori = (mealDetails) => {
        let total = 0;
        if (mealDetails.length) {
            mealDetails.map((cal) => {
                return total += ((cal.calories) * (cal.servingSize));
            })
        }
        return total;
    }

    const calTotalCaloriePerDay = () =>{
        const total = (calTotalCalori(mealDetailsB) 
        + calTotalCalori(mealDetailsL) 
        + calTotalCalori(mealDetailsD) 
        +calTotalCalori(mealDetailsS)).toFixed(0)

        return total;

        console.log('total calorie per day', total);
    }

    const calTotalFat = (mealDetails) => {
        let total = 0;
        if (mealDetails.length) {
            mealDetails.map((cal) => {
                return total += ((cal.fat) * (cal.servingSize));
            })
        }
        return total;
    }

    const calTotalCarbs = (mealDetails) => {
        let total = 0;
        if (mealDetails.length) {
            mealDetails.map((cal) => {
                return total += ((cal.carbs) * (cal.servingSize));
            })
        }
        return total;
    }

    const calTotalProtein = (mealDetails) => {
        let total = 0;
        if (mealDetails.length) {
            mealDetails.map((cal) => {
                return total += ((cal.protein) * (cal.servingSize));
            })
        }
        return total;
    }

    const renderAlert = () =>{
        return(
            // <AlertModal />
            <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>
        )
    }

    const handleDeleteClick = async (e, row) =>{
        setDeleteAlert(true);
        setShowModal(true);
        const foodDetails = {
            planId: row.planId,
            mealId: row.mealId,
            mealType: row.mealType,
            meal: {
                foodId: row.foodId,
                servingSize: row.servingSize
            }
        }
        // console.log('fooddetails', foodDetails);
        // console.log('row',row);

        await deletfoodAPI(foodDetails)
        // .then(result => console.log('deletfoodAPI result', result));

        setReloadSameDateDayPlan(true);
    }

      // check if ther is no food left, render error from foodDiary component
   

   

    const handleAddMeal = (e) =>{
        e.preventDefault();
        setAddMealSearchModal(true);
    }




    const classes = useStyles();

    return (
        <React.Fragment>
            <SearchModal  showModal={addMealSearchModal} hideModal={setAddMealSearchModal} getDayPlanAPI={getDayPlanAPI} />
            <Box ml={40} mr={40}>
                {mealDetailsB.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Breakfast (100g serving)</StyledTableCell>
                                    <StyledTableCell>Serving Size</StyledTableCell>
                                    <StyledTableCell align="right">Calories</StyledTableCell>
                                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealDetailsB.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={((e) => handleDeleteClick(e, row))}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.servingSize}</StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={1}>Total</TableCell>
                                    <TableCell align="center" colSpan={1}>Fat(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Carbs(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Prot(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Kcal</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}></TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalFat(mealDetailsB).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCarbs(mealDetailsB).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalProtein(mealDetailsB).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCalori(mealDetailsB).toFixed(0)}</TableCell>
                                </TableRow>                           
                            </TableBody>                           
                        </Table>
                            <Button color="primary" onClick={handleAddMeal} >Add Meal</Button>
                    </TableContainer>
                }
                {mealDetailsL.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Lunch (100g serving)</StyledTableCell>
                                    <StyledTableCell>Serving Size</StyledTableCell>
                                    <StyledTableCell align="right">Calories</StyledTableCell>
                                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealDetailsL.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={((e) => handleDeleteClick(e, row))}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.servingSize}</StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={1}>Total</TableCell>
                                    <TableCell align="center" colSpan={1}>Fat(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Carbs(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Prot(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Kcal</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}></TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalFat(mealDetailsL).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCarbs(mealDetailsL).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalProtein(mealDetailsL).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCalori(mealDetailsL).toFixed(0)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button color="primary" onClick={handleAddMeal} >Add Meal</Button>
                    </TableContainer>
                }
                {mealDetailsD.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Dinner (100g serving)</StyledTableCell>
                                    <StyledTableCell>Serving Size</StyledTableCell>
                                    <StyledTableCell align="right">Calories</StyledTableCell>
                                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealDetailsD.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={((e) => handleDeleteClick(e, row))}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.servingSize}</StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={1}>Total</TableCell>
                                    <TableCell align="center" colSpan={1}>Fat(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Carbs(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Prot(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Kcal</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}></TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalFat(mealDetailsD).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCarbs(mealDetailsD).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalProtein(mealDetailsD).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCalori(mealDetailsD).toFixed(0)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button color="primary" onClick={handleAddMeal} >Add Meal</Button>
                    </TableContainer>
                }
                {mealDetailsS.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Snack (100g serving)</StyledTableCell>
                                    <StyledTableCell>Serving Size</StyledTableCell>
                                    <StyledTableCell align="right">Calories</StyledTableCell>
                                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealDetailsS.map((row) => (
                                    <StyledTableRow key={row._id}>
                                        <IconButton aria-label="delete" className={classes.margin} onClick={((e) => handleDeleteClick(e, row))}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.servingSize}</StyledTableCell>
                                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={3} />
                                    <TableCell colSpan={1}>Total</TableCell>
                                    <TableCell align="center" colSpan={1}>Fat(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Carbs(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Prot(g)</TableCell>
                                    <TableCell align="center" colSpan={1}>Kcal</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={1}></TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalFat(mealDetailsS).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCarbs(mealDetailsS).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalProtein(mealDetailsS).toFixed(2)}</TableCell>
                                    <TableCell align="center" colSpan={1}>{calTotalCalori(mealDetailsS).toFixed(0)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Button color="primary" onClick={handleAddMeal} >Add Meal</Button>
                    </TableContainer>
                }
            </Box>
        </React.Fragment>
    );
}

export default DrawFoodDiaryTableToDom;