import React, { FC, useContext } from 'react';

import {
  Box,
  HStack,
  IconButton,
  IconButtonProps,
  Spinner,
  StackProps,
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from 'react-icons/lu';

import { Icon } from '@/components/Icons';

export const getPaginationInfo = ({
  page = 1,
  pageSize = 10,
  totalItems = 0,
}) => {
  const firstItemOnPage = totalItems > 0 ? (page - 1) * pageSize + 1 : 0;
  const lastItemOnPage = Math.min(
    (page - 1) * pageSize + pageSize,
    totalItems ?? 0
  );
  const isFirstPage = firstItemOnPage <= 1;
  const isLastPage = lastItemOnPage >= totalItems;
  const firstPage = 1;
  const lastPage = Math.ceil(totalItems / pageSize);

  return {
    firstPage,
    lastPage,
    firstItemOnPage,
    lastItemOnPage,
    isFirstPage,
    isLastPage,
  };
};

export type PaginationContextValue<PageType = number> = {
  page: PageType;
  setPage: (page: PageType) => void;
  firstPage: PageType;
  isFirstPage: boolean;
  lastPage: PageType;
  isLastPage: boolean;
  totalItems: number;
  isLoadingPage: boolean;
  pageSize: number;
  firstItemOnPage: number;
  lastItemOnPage: number;
};

export const PaginationContext = React.createContext<PaginationContextValue>({
  page: 0,
  setPage: () => undefined,
  firstPage: 0,
  isFirstPage: false,
  lastPage: 0,
  isLastPage: false,
  totalItems: 0,
  isLoadingPage: false,
  pageSize: 0,
  firstItemOnPage: 0,
  lastItemOnPage: 0,
});

export const PaginationButtonFirstPage: FC<
  React.PropsWithChildren<Omit<IconButtonProps, 'aria-label'>>
> = ({ ...rest }) => {
  const { t } = useTranslation(['components']);
  const { setPage, firstPage, isFirstPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(firstPage)}
      aria-label={t('components:pagination.firstPage')}
      size="sm"
      disabled={isFirstPage}
      {...rest}
    >
      {' '}
      <Icon icon={LuChevronsLeft} fontSize="lg" />
    </IconButton>
  );
};

export const PaginationButtonPrevPage: FC<
  React.PropsWithChildren<Omit<IconButtonProps, 'aria-label'>>
> = ({ ...rest }) => {
  const { t } = useTranslation(['components']);
  const { setPage, page, isFirstPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(page - 1)}
      aria-label={t('components:pagination.prevPage')}
      size="sm"
      disabled={isFirstPage}
      {...rest}
    >
      <Icon icon={LuChevronLeft} fontSize="lg" />
    </IconButton>
  );
};

export const PaginationButtonLastPage: FC<
  React.PropsWithChildren<Omit<IconButtonProps, 'aria-label'>>
> = ({ ...rest }) => {
  const { t } = useTranslation(['components']);
  const { setPage, lastPage, isLastPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(lastPage)}
      aria-label={t('components:pagination.lastPage')}
      size="sm"
      disabled={isLastPage}
      {...rest}
    >
      <Icon icon={LuChevronsRight} fontSize="lg" />
    </IconButton>
  );
};

export const PaginationButtonNextPage: FC<
  React.PropsWithChildren<Omit<IconButtonProps, 'aria-label'>>
> = ({ ...rest }) => {
  const { t } = useTranslation(['components']);
  const { setPage, page, isLastPage } = useContext(PaginationContext);
  return (
    <IconButton
      onClick={() => setPage(page + 1)}
      aria-label={t('components:pagination.nextPage')}
      size="sm"
      disabled={isLastPage}
      {...rest}
    >
      <Icon icon={LuChevronRight} fontSize="lg" />
    </IconButton>
  );
};

export const PaginationInfo = ({ ...rest }) => {
  const { t } = useTranslation(['components']);
  const { firstItemOnPage, lastItemOnPage, totalItems, isLoadingPage } =
    useContext(PaginationContext);
  const translationProps = {
    t,
    values: {
      firstItemOnPage,
      lastItemOnPage,
      totalItems,
    },
    components: {
      span: <span />,
      box: <Box as="span" display={{ base: 'none', sm: 'inline' }} />,
      spinner: <Spinner size="xs" me="1" />,
    },
  };
  return (
    <HStack
      gap="1"
      align="center"
      textAlign="center"
      justify="center"
      {...rest}
    >
      {isLoadingPage ? (
        <Trans i18nKey="components:pagination.loading" {...translationProps} />
      ) : (
        <Trans i18nKey="components:pagination.showing" {...translationProps} />
      )}
    </HStack>
  );
};

export type PaginationProps = StackProps & {
  setPage: (page: number) => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  isLoadingPage?: boolean;
};

export const Pagination = ({
  setPage,
  page = 1,
  pageSize = 10,
  totalItems = 0,
  isLoadingPage = false,
  ...rest
}: PaginationProps) => {
  const pagination = getPaginationInfo({ page, pageSize, totalItems });
  return (
    <PaginationContext.Provider
      value={{
        setPage,
        page,
        pageSize,
        totalItems,
        isLoadingPage,
        ...pagination,
      }}
    >
      <HStack w="full" {...rest} />
    </PaginationContext.Provider>
  );
};
