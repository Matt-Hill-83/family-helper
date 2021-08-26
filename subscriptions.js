/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateList = /* GraphQL */ `
  subscription OnCreateList {
    onCreateList {
      id
      title
      listItems {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList {
    onUpdateList {
      id
      title
      listItems {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList {
    onDeleteList {
      id
      title
      listItems {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateListItem = /* GraphQL */ `
  subscription OnCreateListItem {
    onCreateListItem {
      id
      title
      quantity
      done
      list {
        id
        title
        listItems {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      actions {
        id
        action
        listItem {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateListItem = /* GraphQL */ `
  subscription OnUpdateListItem {
    onUpdateListItem {
      id
      title
      quantity
      done
      list {
        id
        title
        listItems {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      actions {
        id
        action
        listItem {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteListItem = /* GraphQL */ `
  subscription OnDeleteListItem {
    onDeleteListItem {
      id
      title
      quantity
      done
      list {
        id
        title
        listItems {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      actions {
        id
        action
        listItem {
          id
          title
          quantity
          done
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction {
    onCreateAction {
      id
      action
      listItem {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction {
    onUpdateAction {
      id
      action
      listItem {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction {
    onDeleteAction {
      id
      action
      listItem {
        id
        title
        quantity
        done
        list {
          id
          title
          createdAt
          updatedAt
        }
        actions {
          id
          action
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
