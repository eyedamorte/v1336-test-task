import { Card, Pagination } from "antd";
import { CardSize } from "antd/lib/card";
import classNames from "classnames";
import React, { Component, ReactNode } from "react";
import { defaultPaginateConfig } from "../../constants/pagination";
import { IPaginateConfig } from "../../interfaces/common";

import styles from "./PaginatedList.module.scss";

interface IPaginatedListProps {
  dataSource: any[];
  name: string; 
  // name must be unique string
  renderItem: (item: any, index?: number | string) => ReactNode;
  initialConfig?: IPaginateConfig;
  classname?: string;
}

interface IItemProps {
  title: string;
  bordered?: boolean;
  size: CardSize;
  classname?: string;
}

interface IPaginatedListState {
  config: IPaginateConfig;
  shownElements: any[];
}

const Item: React.FC<IItemProps> = ({
  title,
  bordered,
  children,
  size,
  classname,
}) => {
  return (
    <Card
      className={classNames(classname, styles.list__item)}
      size={size}
      bordered={bordered}
      title={title}
    >
      {children}
    </Card>
  );
};

class PaginatedList extends Component<
  IPaginatedListProps,
  IPaginatedListState
> {
  static Item = Item;

  state: IPaginatedListState = {
    config: this.props.initialConfig || defaultPaginateConfig,
    shownElements: [],
  };

  currentPageName = "pagination_" + this.props.name + "_currentPage";
  perPagePageName = "pagination_" + this.props.name + "_perPage";

  getShownElements = (): any[] => {
    const startElement =
      (this.state.config.currentPage - 1) * this.state.config.perPage;

    return this.props.dataSource.slice(
      startElement,
      startElement + this.state.config.perPage
    );
  };

  paginate = (
    nextPage: IPaginateConfig["currentPage"],
    perPage: number | undefined
  ) => {
    this.setState((state) => ({
      config: { ...state.config, currentPage: nextPage },
    }));
    if (perPage) {
      this.setState((state) => ({
        config: { ...state.config, perPage },
      }));
    }
  };

  componentDidMount() {
    this.setState(() => ({
      shownElements: this.getShownElements(),
    }));

    const savedPerPage = localStorage.getItem(this.perPagePageName);
    const savedCurrentPage = localStorage.getItem(this.currentPageName);

    if (savedPerPage && savedCurrentPage) {
      this.setState(() => ({
        config: {
          perPage: parseInt(savedPerPage),
          currentPage: parseInt(savedCurrentPage),
        },
      }));
    }
  }

  componentDidUpdate(
    previousProps: IPaginatedListProps,
    previousState: IPaginatedListState
  ) {
    if (
      previousProps !== this.props ||
      previousState.config.currentPage !== this.state.config.currentPage ||
      previousState.config.perPage !== this.state.config.perPage
    ) {
      this.setState(() => ({
        shownElements: this.getShownElements(),
      }));

      localStorage.setItem(
        this.perPagePageName,
        this.state.config.perPage.toString()
      );
      localStorage.setItem(
        this.currentPageName,
        this.state.config.currentPage.toString()
      );
    }
  }

  render() {
    const { renderItem, dataSource, initialConfig, classname } = this.props;
    const { shownElements, config } = this.state;

    return (
      <>
        <div className={classNames(classname, styles.list)}>
          {shownElements.map(renderItem)}
        </div>
        <div>
          <Pagination
            onChange={this.paginate}
            current={config.currentPage}
            pageSize={config.perPage}
            total={dataSource.length}
            defaultPageSize={initialConfig?.perPage || 20}
            defaultCurrent={initialConfig?.currentPage || 1}
          />
        </div>
      </>
    );
  }
}

export default PaginatedList;
