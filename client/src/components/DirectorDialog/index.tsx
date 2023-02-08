import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField} from "@mui/material"
import {useForm} from "react-hook-form"
import {TDirectorForm} from "../../types/forms"
import {useMutation, useQuery} from "@apollo/client"
import {GET_DIRECTOR_BY_ID, GET_DIRECTORS} from "../../graphql/queries/directorQueries"
import {TDialog} from "../../types/modal"
import {ADD_NEW_DIRECTOR, UPDATE_DIRECTOR} from "../../graphql/mutations/directorMutations"


export default ({modalProps, setModalProps}: TDialog) => {
  const {loading, error, data: fields} = useQuery(GET_DIRECTOR_BY_ID, {
    skip: !modalProps.idEntity,
    variables: {
      id: modalProps.idEntity
    }
  })
  const [createNewDirector, {loading: loadingNew, error: errorNew, data: dataNew}] = useMutation(ADD_NEW_DIRECTOR, {
    // refetchQueries: [
    //   {query: GET_DIRECTORS}
    // ], // OR
    update(cache, {data}) {
      const variables = {name: ''}
      const allDirectors = cache.readQuery({query: GET_DIRECTORS, variables})
      if (allDirectors?.directors && data?.addDirector) {
        cache.writeQuery({
          query: GET_DIRECTORS,
          variables,
          data: {
            directors: [...allDirectors.directors, data.addDirector]
          }
        })
      }
    }
  })
  const [updateDirector, {loading: loadingUp, error: errorUp, data: dataUp}] = useMutation(UPDATE_DIRECTOR)

  const {watch, register, formState: {errors, isValid}, reset, setValue, control} = useForm<TDirectorForm>({
    mode: "onBlur",
    reValidateMode: "onChange" || "onBlur",
    defaultValues: {
      name: '',
      age: 0
    }
  })

  React.useEffect(() => {
    if (fields && fields.director) {
      setValue("name", fields.director.name)
      setValue("age", fields.director.age)
    }
    return () => reset()
  }, [fields, loading, modalProps.isOpen])

  const onClose = React.useCallback(() => {
    setModalProps({isOpen: false})
  }, [])

  const handleOnSave = React.useCallback(async () => {
    if (isValid) {
      const {name, age} = watch()
      if (modalProps.idEntity) {
        await updateDirector({
          variables: {
            id: modalProps.idEntity,
            name,
            age
          }
        })
      } else {
        await createNewDirector({
          variables: {
            name,
            age
          }
        })
      }
      onClose()
    }
  }, [isValid])

  return (
    <Dialog onClose={onClose} open={modalProps.isOpen} fullWidth>
      <DialogTitle>Director information</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            {...register("name", {
              required: "Field is important for filling",
              minLength: {
                value: 2,
                message: "min length is 2"
              }
            })}
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{shrink: true}}
            placeholder={"Director name"}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            {...register("age", {
              required: "Field is important for filling and it has to be a NUMBER type",
              valueAsNumber: true,
              validate: (value) => typeof value === "number" && value > 0 || "Age has to be more than 0"
            })}
            type={"number"}
            margin="dense"
            id="age"
            label="Age"
            fullWidth
            variant="outlined"
            error={!!errors.age}
            helperText={errors.age?.message}
            InputLabelProps={{shrink: true}}
            placeholder={"Age"}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{paddingX: 3}}>
        <Button
          variant={"outlined"}
          disabled={!isValid}
          onClick={handleOnSave}
        >Save</Button>
      </DialogActions>
    </Dialog>
  )
}
