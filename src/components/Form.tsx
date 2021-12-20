import { MouseEvent, FormEvent, FC } from 'react'
import Button from '@mui/material/Button';

interface Props {
  className: string,
  title: string,
  onSubmit(evt: FormEvent): void,
  onClick(): void,
}

const Form: FC<Props> = (props) => {
  const { className, onSubmit, title, children, onClick } = props;

  const stopPropagation = (evt: MouseEvent<HTMLDivElement | HTMLFormElement>) => evt.stopPropagation();

  return (
    <form
      className={className}
      noValidate
      autoComplete="off"
      onClick={stopPropagation}
      onSubmit={onSubmit}
    >
      <h1 className='formTitle'>{title}</h1>
      {children}
      <div className='btns-container'>
        <Button
          color='primary'
          onClick={onClick}
        > Cancel
        </Button>
        <Button
          type='submit'
          variant="contained"
          color='primary'>
          Save Name
        </Button>
      </div>
    </form>
  )
}

export default Form;