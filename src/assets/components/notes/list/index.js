import React, { Fragment } from 'react';
import { Button, Column, Tag, Title, List } from "rbx";
import Moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function ListNotes(props) {
    return (
        <Fragment>
            <Column.Group breakpoint="mobile">
                <Column size={6} offset={1}>
                    <Title size={6}>
                        {/* Quantidade de notas */}
                        {props.notes.length} Notes
                    </Title>
                    <Column size={2}>
                        {/* Botão para criar nova nota */}
                        <Button state="active" color="custom-purple" outlined size="small" onClick={() => props.createNote()}>
                            Notes +
                        </Button>
                    </Column>

                </Column>
            </Column.Group>
            <List className="notes-list">
                {props.notes.map((item, key) =>
                    <List.Item key={key} onClick={() => props.selectNote(item._id)} active={item == props.current_note}>
                        <Title size={6}>
                            {/* (/(<... serve para pegar uma string, e o substring, é a quantidade de caracteres que será exibido , limitando o que será puxado  */}
                            {item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
                        </Title>
                        <Title size={6} subtitle spaced={false}>
                            {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
                        </Title>

                        <Column.Group breakpoint="mobile">
                            <Column size={10}>
                                <Tag color="dark">
                                    {/* Moment para ver quando a nota foi criada */}
                                    {Moment(item.created_at).format('DD/MM')}
                                </Tag>
                            </Column>
                            {/* Botão delete */}
                            <Column size={2}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => props.deleteNote(item)}
                                    color="grey"
                                />
                            </Column>
                        </Column.Group>
                    </List.Item>
                )}
            </List>
        </Fragment>
    )
}

export default ListNotes;