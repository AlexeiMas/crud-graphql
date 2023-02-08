import React from 'react'
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormHelperText, InputLabel, MenuItem, Select, Slider, TextField, Typography
} from "@mui/material"
import {Controller, useForm} from "react-hook-form"
import {TMovieForm} from "../../types/forms"
import {useLazyQuery, useMutation, useQuery} from "@apollo/client"
import {GET_DIRECTORS, GET_DIRECTORS_FOR_SELECTOR} from "../../graphql/queries/directorQueries"
import {GET_MOVIE_BY_ID, GET_MOVIES} from "../../graphql/queries/movieQueries"
import {TDialog} from "../../types/modal"
import {ADD_NEW_MOVIE, UPDATE_MOVIE} from "../../graphql/mutations/movieMutations"

export default ({modalProps, setModalProps}: TDialog) => {
  const {data} = useQuery(GET_DIRECTORS_FOR_SELECTOR, {
    variables: {
      name: ''
    }
  })
  const {loading, error, data: fields} = useQuery(GET_MOVIE_BY_ID, {
    skip: !modalProps.idEntity,
    variables: {
      id: modalProps.idEntity
    }
  })
  const [createNewMovie, {loading: loadingNew, error: errorNew, data: dataNew}] = useMutation(ADD_NEW_MOVIE, {
    // refetchQueries: [
    //   {query: GET_MOVIES, variables: {name: ''}}
    // ], // OR
    update(cache, {data}) {
      const variables = {name: ''}
      const allMovies = cache.readQuery({query: GET_MOVIES, variables})
      if (allMovies?.movies && data?.addMovie) {
        cache.writeQuery({
          query: GET_MOVIES,
          variables,
          data: {
            movies: [...allMovies.movies, data.addMovie]
          }
        })
      }
    }
  })
  const [updateMovie, {loading: loadingUp, error: errorUp, data: dataUp}] = useMutation(UPDATE_MOVIE)
  const [updateDirectorList] = useLazyQuery(GET_DIRECTORS)

  const {watch, register, formState: {errors, isValid}, reset, setValue, control} = useForm<TMovieForm>({
    mode: "onBlur",
    reValidateMode: "onChange" || "onBlur",
    defaultValues: {
      title: "",
      genre: "",
      director: "",
      rate: 0,
      watched: false
    }
  })

  React.useEffect(() => {
    if (fields && fields.movie) {
      setValue("title", fields.movie.name)
      setValue("genre", fields.movie.genre)
      fields.movie.rate && setValue("rate", fields.movie.rate)
      fields.movie.director?.id && setValue("director", fields.movie.director.id)
      setValue("watched", fields.movie.watched)
    }
    return () => reset()
  }, [fields, loading, modalProps.isOpen])

  const onClose = React.useCallback(() => {
    setModalProps({isOpen: false})
  }, [])

  const MenuProps = React.useMemo(() => {
    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    return {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    }
  }, [data])


  const handleOnSave = React.useCallback(async () => {
    if (isValid) {
      const {title, genre, director, rate, watched} = watch()
      if (modalProps.idEntity) {
        await updateMovie({
          variables: {
            id: modalProps.idEntity,
            name: title,
            genre,
            directorId: director,
            rate,
            watched
          }
        })
      } else {
        await createNewMovie({
          variables: {
            name: title,
            genre,
            directorId: director,
            rate,
            watched
          }
        })
      }
      await updateDirectorList({variables: {
          name: ''
        }
      })

      onClose()
    }
  }, [isValid])

  return (
    <Dialog onClose={onClose} open={modalProps.isOpen} fullWidth>
      <DialogTitle>Movie information</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            {...register("title", {
              required: "Field is important for filling",
              minLength: {
                value: 2,
                message: "min length is 2"
              }
            })}
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title?.message}
            InputLabelProps={{shrink: true}}
            placeholder={"Movie title"}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            {...register("genre", {
              required: "Field is important for filling",
              pattern: {
                value: /^[A-Za-zА-Яа-я- ]+$/i,
                message: "must be just Latin and Ciril letters"
              },
              minLength: {
                value: 2,
                message: "min length is 2"
              }
            })}
            margin="dense"
            id="genre"
            label="Genre"
            fullWidth
            variant="outlined"
            error={!!errors.genre}
            helperText={errors.genre?.message}
            InputLabelProps={{shrink: true}}
            placeholder={"Genre"}
          />
        </FormControl>
        <FormControl fullWidth sx={{py: 1}}>
          <Typography>Rate</Typography>
          <Controller
            control={control}
            name={"rate"}
            render={({field: {onChange, value}}) => (
              <Slider
                onChange={onChange}
                min={0} max={5} step={1}
                aria-label="Default" valueLabelDisplay="auto"
                value={value}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.director}>
          <InputLabel id="director-selector-label">Director</InputLabel>
          <Controller
            control={control}
            name={"director"}
            rules={{required: {value: true, message: "This field can't be empty!"}}}
            render={({field: {onChange, onBlur, value}, fieldState: { invalid, isTouched, isDirty, error }}) => (
              <>
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  labelId="director-selector-label"
                  id="director-select"
                  label="Director"
                  MenuProps={MenuProps}
                  autoFocus={invalid}
                >
                  <MenuItem value={""} disabled>--------------------</MenuItem>
                  {data?.directors?.length && data.directors.map((item) => (
                    <MenuItem value={item?.id!} key={item?.id}>{item?.name}</MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error?.message}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{justifyContent: "space-between", paddingLeft: 2, paddingRight: 3}}>
        <FormControl>
          <Controller
            control={control}
            name={"watched"}
            render={({field: {onChange, onBlur, value}}) => (
              <Checkbox
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
              />
            )}
          />
        </FormControl>
        <Button
          variant={"outlined"}
          disabled={!isValid}
          onClick={handleOnSave}
        >Save</Button>
      </DialogActions>
    </Dialog>
  )
}
