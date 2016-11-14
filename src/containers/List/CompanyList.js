import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import faker from 'faker';

import * as ListActions from '../../actions/companyList';
import { getList } from '../../utils/selectors';
import ListItem from '../../components/CompanyItem/CompanyItem';


const propTypes = {
  getList: PropTypes.func.isRequired,
  addItemToList: PropTypes.func.isRequired,
  removeItemFromList: PropTypes.func.isRequired,
  editItemInList: PropTypes.func.isRequired,
  list: ImmutablePropTypes.list.isRequired,
  listIsLoading: PropTypes.bool.isRequired,
  listAddIsLoading: PropTypes.bool.isRequired
};


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.addItemToList = this.addItemToList.bind(this);
    this.removeItemFromList = this.removeItemFromList.bind(this);
  }

  componentWillMount() {
    this.props.getList();
  }

  addItemToList() {
    return this.props.addItemToList({
      companyName: faker.company.companyName(),
      ...ListActions.schemas.list.getDefaults()
    });
  }

  removeItemFromList(itemId) {
    return () => {
      this.props.removeItemFromList(itemId);
    };
  }

  render() {
    const { listIsLoading, listAddIsLoading, list, editItemInList } = this.props;
    return (
      <ul className="list-group" style={{ textAlign: 'center' }}>
        {listIsLoading ?
          <h1>List is loading...</h1> :
          <div>
            <button onClick={this.addItemToList}>
              {listAddIsLoading ?
                <span>In process...</span> :
                <span>Add new item</span>
              }
            </button>
            {list.map(item =>
              <ListItem
                key={item.get('id')}
                item={item}
                editItemInList={editItemInList}
                removeItemFromList={this.removeItemFromList(item.get('id'))}
              />
            )}
          </div>
        }
      </ul>
    );
  }
}


ListContainer.propTypes = propTypes;

function mapStateToProps({ list, ui }) {
  return {
    listIsLoading: ui.get('listIsLoading'),
    listAddIsLoading: ui.get('listAddIsLoading'),
    list: getList(list)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
